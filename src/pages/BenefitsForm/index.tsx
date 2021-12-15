import { useState } from 'react'

import { Button } from '@chakra-ui/button'
import {
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/layout'
import { useBreakpointValue, useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useFormik, Form, FormikProvider } from 'formik'
import * as yup from 'yup'

import { Input } from '../../components/Form/Input'
import { Loading } from '../../components/Loading'
import { useLocations } from '../../contexts/locations'
import { apiCep, apiCnpj, apiWS } from '../../services'
import removeEspecialCharacter from '../../utils/removeEspecialCharacter'

interface ICNPJResponse {
  message: string
  status: string
  complemento: string
  nome: string
  uf: string
  telefone: string
  email: string
  bairro: string
  logradouro: string
  numero: string
  cep: string
  municipio: string
}

interface IFormValues {
  cnpj: string
  razaosocial: string
  cep: string
  logradouro: string
  numero: string
  complemento: string
  cidadenome: string
  bairro: string
  ufnome: string
  ativo: boolean
}

interface IPointsOfSale {
  updatekind: number
  id: number
  cnpj: string
  razaosocial: string
  cep: string
  logradouro: string
  numero: number
  complemento: string
  cidadeid: number
  cidadenome: string
  bairroid: number
  uf: string
  ufnome: string
  ativo: boolean
}

interface IEstadoInfo {
  nome: string
}

interface ILocationResponse {
  bairro: string
  cep: string
  cidade: string
  estado_info: IEstadoInfo
  logradouro: string
}

const schema = yup.object().shape({
  cnpj: yup
    .string()
    .test('len', 'CNPJ inválido', (val) => {
      if (val) {
        const len = removeEspecialCharacter(val as string).length
        return len === 14
      }
      return false
    })
    .required('Campo obrigatório.'),
  razaosocial: yup.string().required('Campo obrigatório.'),
  cep: yup
    .string()
    .test('len', 'Cep inválido', (val) => {
      if (val) {
        const len = removeEspecialCharacter(val as string).length
        return len === 8
      }
      return false
    })
    .required('Campo obrigatório.'),
  logradouro: yup.string().required('Campo obrigatório.'),
  numero: yup.string().required('Campo obrigatório.'),
  cidadenome: yup.string().required('Campo obrigatório.'),
  bairro: yup.string().required('Campo obrigatório.'),
  ufnome: yup.string().required('Campo obrigatório.'),
})

const BenefitsForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { cities, states } = useLocations()
  const toast = useToast()

  const createGroup = async (data: IPointsOfSale[]) => {
    try {
      const {
        status,
        data: { message, httpstatus },
      } = await apiWS.post('/WSEmpresaControladora', data)
      if (status === 200) {
        toast({
          title: 'Empresa cadastrada com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      if (httpstatus === 400) {
        toast({
          title: message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (e) {
      const error = e as AxiosError
      if (error?.response?.data.message) {
        return toast({
          title: error?.response?.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
      return toast({
        title: 'Ocorreu um erro ao processar sua requisiçao.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (values: IFormValues) => {
    setIsLoading(true)

    const {
      ativo,
      // bairro,
      cep,
      cidadenome,
      cnpj,
      complemento,
      logradouro,
      numero,
      razaosocial,
      ufnome,
    } = values

    const citie = cities.find((citie) => {
      return (
        removeEspecialCharacter(citie.nome) ===
        removeEspecialCharacter(values.cidadenome)
      )
    })

    if (citie) {
      const state = states.find((state) => state.id === parseInt(citie?.uf))
      if (state) {
        const data: IPointsOfSale[] = [
          {
            updatekind: 1,
            id: 0,
            cnpj,
            razaosocial,
            cep: removeEspecialCharacter(cep),
            logradouro,
            numero: parseInt(numero),
            complemento,
            cidadeid: citie?.id,
            cidadenome,
            bairroid: 0,
            uf: state?.uf,
            ufnome,
            ativo,
          },
        ]

        await createGroup(data)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      cnpj: '',
      razaosocial: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cidadenome: '',
      bairro: '',
      ufnome: '',
      ativo: true,
    },
    validationSchema: schema,
    onSubmit,
  })

  const getCompanyData = async () => {
    setIsLoading(true)
    try {
      const {
        data: {
          status,
          message,
          bairro,
          cep,
          complemento,
          // email,
          logradouro,
          municipio,
          nome,
          numero,
          // telefone,
          uf,
        },
      } = await apiCnpj.get<ICNPJResponse>(
        removeEspecialCharacter(formik.values.cnpj)
      )
      if (status === 'ERROR') {
        return toast({
          title: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }

      formik.setValues({
        ufnome: uf,
        cep,
        cidadenome: municipio,
        ativo: true,
        bairro,
        cnpj: formik.values.cnpj,
        complemento: complemento,
        logradouro,
        numero: numero,
        razaosocial: nome,
      })
    } catch {
      toast({
        title: 'Ocorreu um erro ao processar sua requisiçao.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getLocationData = async () => {
    setIsLoading(true)
    try {
      const {
        data: { bairro, cidade, estado_info, logradouro },
      } = await apiCep.get<ILocationResponse>(
        removeEspecialCharacter(formik.values.cep)
      )

      formik.setValues({
        ufnome: estado_info.nome,
        cep: formik.values.cep,
        cidadenome: cidade,
        ativo: true,
        bairro,
        cnpj: formik.values.cnpj,
        complemento: formik.values.complemento,
        logradouro,
        numero: formik.values.numero,
        razaosocial: formik.values.razaosocial,
      })
    } catch {
      toast({
        title:
          'Ocorreu um erro ao processar sua requisiçao. Favor verique seu Cep.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const templateColumns = useBreakpointValue({
    lg: '4fr',
    '2xl': '2fr 2fr',
  })

  return (
    <Box padding={{ xl: '20', md: '6', lg: '8' }}>
      <Loading isLoading={isLoading} />

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <SimpleGrid spacing={'6'} maxWidth={1280} margin={'0 auto'}>
            <VStack spacing={'2'}>
              <Heading fontWeight={'normal'} size={'lg'} alignSelf={'start'}>
                Informações do ponto
              </Heading>
              <Divider />
              <HStack width={'100%'} spacing={'8'}>
                <HStack alignItems={'flex-end'} width={'50%'}>
                  <Input
                    pr={110}
                    label={'Nome do produto'}
                    name={'descricao'}
                  />
                </HStack>
                <HStack width={'50%'}>
                  <Input
                    label={'Vigência Inicial'}
                    mask={'99/99/9999'}
                    name={'vigenciainicial'}
                  />
                  <Input
                    label={'Vigência Final'}
                    mask={'99/99/9999'}
                    name={'vigenciafinal'}
                  />
                </HStack>
              </HStack>
            </VStack>
            <SimpleGrid
              spacing={'8'}
              flexDirection={'column'}
              gridTemplateColumns={templateColumns}
            >
              <VStack spacing={'2'}>
                <HStack width={'100%'}>
                  <Heading
                    fontWeight={'normal'}
                    size={'lg'}
                    alignSelf={'start'}
                    pr={'2'}
                  >
                    Descontos
                  </Heading>
                  <Input variant="switch" name={'isauferirpontosenabled'} />
                </HStack>
                <Divider />
                <HStack width={'100%'} spacing={'8'}>
                  <HStack width={'50%'} alignItems={'flex-end'}>
                    <Input pr={110} label={'Referencia'} name={'referencia'} />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input label={'Proporção'} name={'proporcao'} />
                  </HStack>
                </HStack>
                <HStack width={'100%'} spacing={'8'}>
                  <HStack width={'50%'}>
                    <Input
                      label={'Quantidade de pontos'}
                      name={'auferirpontos'}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      label={'Validade dos pontos'}
                      name={'validadepontos'}
                    />
                  </HStack>
                </HStack>
                <HStack
                  width={'100%'}
                  spacing={'8'}
                  justifyContent={'flex-start'}
                >
                  <HStack width={'50%'}>
                    <Input
                      variant="switch"
                      label={'Desprezar fração no cálculo'}
                      name={'desprezarfracao'}
                    />
                  </HStack>
                </HStack>
              </VStack>
              <VStack spacing={'2'}>
                <HStack width={'100%'}>
                  <Heading
                    fontWeight={'normal'}
                    size={'lg'}
                    alignSelf={'start'}
                    pr={'2'}
                  >
                    Pontos
                  </Heading>
                  <Input variant="switch" name={'isauferirpontosenabled'} />
                </HStack>
                <Divider />
                <HStack width={'100%'} spacing={'8'}>
                  <HStack width={'50%'} alignItems={'flex-end'}>
                    <Input pr={110} label={'Referencia'} name={'referencia'} />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input label={'Proporção'} name={'proporcao'} />
                  </HStack>
                </HStack>
                <HStack width={'100%'} spacing={'8'}>
                  <HStack width={'50%'}>
                    <Input
                      label={'Quantidade de pontos'}
                      name={'auferirpontos'}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      label={'Validade dos pontos'}
                      name={'validadepontos'}
                    />
                  </HStack>
                </HStack>
                <HStack
                  width={'100%'}
                  spacing={'8'}
                  justifyContent={'flex-start'}
                >
                  <HStack width={'50%'}>
                    <Input
                      variant="switch"
                      label={'Desprezar fração no cálculo'}
                      name={'desprezarfracao'}
                    />
                  </HStack>
                </HStack>
              </VStack>
            </SimpleGrid>

            <HStack justifyContent={'space-between'}>
              <Button bg={'red.400'} color={'white'} minWidth={150}>
                Cancelar
              </Button>
              <Button
                bg={'green.400'}
                color={'white'}
                minWidth={150}
                type="submit"
              >
                Salvar
              </Button>
            </HStack>
          </SimpleGrid>
        </Form>
      </FormikProvider>
    </Box>
  )
}

export default BenefitsForm
