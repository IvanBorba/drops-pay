import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
import { useFormik, Form, FormikProvider } from 'formik'
import * as yup from 'yup'

import { Input } from '../../components/Form/Input'
import { Loading } from '../../components/Loading'

interface IProducts {
  uid: string
}

interface IBenefitsForm {
  grupoclientesdescricao: string
  descricao: string
  isauferirpontosenabled: boolean
  referencia: string
  proporcao: string
  auferirpontos: string
  vigenciainicial: string
  vigenciafinal: string
  validadepontos: string
  desprezarfracao: boolean
  isconcederdescontoenabled: boolean
  referenciadesconto: string
  auferirdesconto: string
  isvalorcashbackenabled: boolean
  referenciacashback: string
  auferircashback: string
  ativo: true
  itensvinculados: IProducts[]
}

const schema = yup.object().shape({})

const BenefitsForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const toast = useToast()

  const onSubmit = async (values: IBenefitsForm) => {
    setIsLoading(true)
    return
  }

  const formik = useFormik({
    initialValues: {
      grupoclientesdescricao: '',
      descricao: '',
      isauferirpontosenabled: false,
      referencia: '',
      proporcao: '',
      auferirpontos: '',
      vigenciainicial: '',
      vigenciafinal: '',
      validadepontos: '',
      desprezarfracao: false,
      isconcederdescontoenabled: false,
      referenciadesconto: '',
      auferirdesconto: '',
      isvalorcashbackenabled: false,
      referenciacashback: '',
      auferircashback: '',
      ativo: true,
      itensvinculados: [],
    },
    validationSchema: schema,
    onSubmit,
  })

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
                  <Input pr={110} label={'Descrição'} name={'descricao'} />
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
                  <Input variant="switch" name={'isconcederdescontoenabled'} />
                </HStack>
                <Divider />
                <HStack width={'100%'} spacing={'8'}>
                  <HStack width={'50%'} alignItems={'flex-end'}>
                    <Input
                      pr={110}
                      label={'Referencia'}
                      name={'referenciadesconto'}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input label={'Desconto'} name={'auferirdesconto'} />
                  </HStack>
                </HStack>
                <HStack width={'100%'}>
                  <Heading
                    fontWeight={'normal'}
                    size={'lg'}
                    alignSelf={'start'}
                    pr={'2'}
                  >
                    Cashback
                  </Heading>
                  <Input variant="switch" name={'isvalorcashbackenabled'} />
                </HStack>
                <Divider />
                <HStack width={'100%'} spacing={'8'}>
                  <HStack width={'50%'} alignItems={'flex-end'}>
                    <Input
                      pr={110}
                      label={'Referencia'}
                      name={'referenciacashback'}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input label={'Cashback'} name={'auferircashback'} />
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
