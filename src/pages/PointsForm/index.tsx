import { Button } from '@chakra-ui/button'
import {
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/layout'
import { useFormik, Form, FormikProvider } from 'formik'

import { Input } from '../../components/Form/Input'

const PointsForm = () => {
  const formik = useFormik({
    initialValues: {
      test: '',
    },
    onSubmit: () => console.log('oi'),
  })

  return (
    <Box padding={'4'}>
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
                  <Input label={'Cnpj'} name={'cnpj'} />
                  <Button bg={'blue.300'} color={'white'} minWidth={150}>
                    Buscar CNPJ
                  </Button>
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
                  <Input label={'Cep'} name={'cep'} />
                  <Button bg={'blue.300'} color={'white'} minWidth={150}>
                    Buscar CEP
                  </Button>
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
              <Button bg={'green.400'} color={'white'} minWidth={150}>
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
