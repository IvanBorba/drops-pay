import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@chakra-ui/button'
import {
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useFormik, Form, FormikProvider } from 'formik'
import * as yup from 'yup'

import { Input } from '../../components/Form/Input'
import { Loading } from '../../components/Loading'
import { useLocations } from '../../contexts/locations'
import { usePointsOfSale } from '../../contexts/points-of-sale'
import { apiCep, apiCnpj, apiWS } from '../../services'
import removeEspecialCharacter from '../../utils/removeEspecialCharacter'
import PointsOfSale from '../PointsOfSale'

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
  latitude: number
  longitude: number
  inputedbygps: boolean
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
const PointsForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const navigate = useNavigate()

  const { pointsOfSale } = usePointsOfSale()

  const { cities, states } = useLocations()
  const toast = useToast()

  const createPointOfSale = async (data: IPointsOfSale[]) => {
    try {
      const {
        status,
        data: { message, httpstatus },
      } = await apiWS.post('/WSPontoVenda', data)
      if (status === 200) {
        toast({
          title: 'Ponto de vendas cadastrado com sucesso.',
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
            id: isEdit ? parseInt(params.id || '0') : 0,
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
            latitude: 1,
            longitude: 1,
            inputedbygps: false,
          },
        ]

        await createPointOfSale(data)
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

  const getPoint = async (id: string) => {
    setIsLoading(true)

    try {
      const [
        {
          ativo,
          bairroid,
          cep,
          cidadenome,
          cnpj,
          complemento,
          logradouro,
          numero,
          razaosocial,
          ufnome,
        },
      ] = pointsOfSale.filter((point) => point.id === parseInt(id))

      formik.setValues({
        ativo,
        bairro: String(bairroid),
        cep,
        cidadenome,
        cnpj,
        complemento,
        logradouro,
        numero: String(numero),
        razaosocial,
        ufnome,
      })
    } catch {
      return toast({
        title: 'Ocorreu um erro ao processar sua requisição.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const params = useParams()

  useEffect(() => {
    if (params.id) {
      setIsEdit(true)
      getPoint(params.id)
    }
  }, [params.id])

  return (
    <Box padding={{ xl: '20', md: '6', lg: '8' }}>
      <Loading isLoading={isLoading} />

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <SimpleGrid
            spacing={'6'}
            maxWidth={1280}
            margin={'0 auto'}
            boxShadow={'0px 3.45362px 34.5362px rgba(170, 170, 170, 0.25);'}
            padding={'16'}
          >
            <VStack spacing={'2'}>
              <Heading fontWeight={'normal'} size={'lg'} alignSelf={'start'}>
                Informações do ponto
              </Heading>
              <Divider />
              <HStack width={'100%'} spacing={'8'}>
                <HStack alignItems={'flex-end'} width={'50%'}>
                  <Input
                    pr={110}
                    mask={'99.999.999/9999-99'}
                    label={'Cnpj'}
                    name={'cnpj'}
                    rightElement={
                      <Button
                        minWidth={100}
                        size="sm"
                        bg={'blue.300'}
                        color={'white'}
                        onClick={getCompanyData}
                      >
                        Pesquisar
                      </Button>
                    }
                  />
                </HStack>
                <HStack width={'50%'}>
                  <Input label={'Razão Social'} name={'razaosocial'} />
                </HStack>
              </HStack>
            </VStack>
            <VStack spacing={'2'}>
              <Heading fontWeight={'normal'} size={'lg'} alignSelf={'start'}>
                Informações de localização
              </Heading>
              <Divider />
              <HStack width={'100%'} spacing={'8'}>
                <HStack width={'50%'} alignItems={'flex-end'}>
                  <Input
                    pr={110}
                    label={'Cep'}
                    mask={'99.999-999'}
                    name={'cep'}
                    rightElement={
                      <Button
                        minWidth={100}
                        size="sm"
                        bg={'blue.300'}
                        color={'white'}
                        onClick={getLocationData}
                      >
                        Pesquisar
                      </Button>
                    }
                  />
                </HStack>
                <HStack width={'50%'}>
                  <Input label={'Cidade'} name={'cidadenome'} />
                  <Input label={'Estado'} name={'ufnome'} />
                </HStack>
              </HStack>
              <HStack width={'100%'} spacing={'8'}>
                <HStack width={'50%'}>
                  <Input label={'Rua'} name={'logradouro'} />
                  <Input label={'Numero'} name={'numero'} width={'30%'} />
                </HStack>
                <HStack width={'50%'}>
                  <Input label={'Bairro'} name={'bairro'} />
                </HStack>
              </HStack>
              <HStack width={'100%'} spacing={'8'} justifyContent={'flex-end'}>
                <HStack width={'50%'}>
                  <Input label={'Complemento'} name={'complemento'} />
                </HStack>
                <HStack width={'50%'} justifyContent={'flex-end'}>
                  <SimpleGrid>
                    <Input
                      variant="switch"
                      label={'Ponto de vendas ativo?'}
                      name={'ativo'}
                    />
                  </SimpleGrid>
                </HStack>
              </HStack>
            </VStack>
            <HStack justifyContent={'space-between'}>
              <Button
                bg={'red.400'}
                color={'white'}
                minWidth={150}
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button
                bg={'green.400'}
                color={'white'}
                minWidth={150}
                type="submit"
              >
                {isEdit ? 'Editar' : 'Cadastrar'}
              </Button>
            </HStack>
          </SimpleGrid>
        </Form>
      </FormikProvider>
    </Box>
  )
}

export default PointsForm
