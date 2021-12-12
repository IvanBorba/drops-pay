import { Button } from '@chakra-ui/button'
import {
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/layout'
import { InputGroup, InputRightElement } from '@chakra-ui/react'
import { useFormik, Form, FormikProvider } from 'formik'

import { Input } from '../../components/Form/Input'

const PointsForm = () => {
  const formik = useFormik({
    initialValues: {
      updatekind: 1,
      id: 0,
      cnpj: '22221122221100',
      razaosocial: 'Posto Insomnia 2',
      cep: '91530000',
      logradouro: 'Av.Ipiranga',
      numero: 6900,
      complemento: '',
      cidadeid: 4174,
      cidadenome: 'Porto Alegre',
      bairroid: 0,
      uf: 'RS',
      ufnome: 'Rio Grande do Sul',
      ativo: true,
      latitude: 1,
      longitude: 1,
      inputedbygps: false,
    },
    // eslint-disable-next-line no-console
    onSubmit: (values) => console.log(values),
  })

  return (
    <Box padding={'32'}>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <SimpleGrid spacing={'6'}>
            <VStack spacing={'2'}>
              <Heading fontWeight={'normal'} size={'lg'} alignSelf={'start'}>
                Informações do ponto
              </Heading>
              <Divider />
              <HStack width={'100%'} spacing={'8'}>
                <HStack alignItems={'flex-end'} width={'50%'}>
                  <Input
                    pr={160}
                    label={'Cnpj'}
                    name={'cnpj'}
                    rightElement={
                      <Button
                        minWidth={150}
                        size="sm"
                        bg={'blue.300'}
                        color={'white'}
                      >
                        Buscar CNPJ
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
                  <Input label={'Bairro'} name={'bairroid'} />
                </HStack>
              </HStack>
              <HStack width={'100%'} spacing={'8'}>
                <HStack width={'50%'}>
                  <Input label={'Complemento'} name={'complemento'} />
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
