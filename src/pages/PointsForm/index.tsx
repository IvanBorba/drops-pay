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
import { useToast } from '@chakra-ui/react'
import { useFormik, Form, FormikProvider } from 'formik'

import { Input } from '../../components/Form/Input'
import { Loading } from '../../components/Loading'
import { apiCnpj } from '../../services'

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

const PointsForm = () => {
  const [isLoading, setIsLoading] = useState(false)

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
    // eslint-disable-next-line no-console
    onSubmit: (values) => console.log(values),
  })

  const toast = useToast()
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
      } = await apiCnpj.get<ICNPJResponse>(formik.values.cnpj)
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
                        Preencher
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
                    pr={160}
                    label={'Cep'}
                    name={'cep'}
                    rightElement={
                      <Button
                        minWidth={150}
                        size="sm"
                        bg={'blue.300'}
                        color={'white'}
                      >
                        Buscar Cep
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

export default PointsForm
