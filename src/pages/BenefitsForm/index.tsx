import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

import Button from '../../components/Button'
import { Input } from '../../components/Form/Input'
import { Loading } from '../../components/Loading'
import Select from '../../components/Select'
import { usePointsOfSale } from '../../contexts/points-of-sale'
import { apiWS } from '../../services'

interface IProducts {
  uid: string
}

interface IBenefitsForm {
  pontovendaid: string
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

interface IItens {
  uid: string
  classificacao: string
  tipo: string
  tipodescricao: string
  descricao: string
}

interface IBenefitsData {
  id: number
  pontovendaid: number
  razaosocial: string
  grupoclientesid: number
  grupoclientesdescricao: string
  descricao: string
  isauferirpontosenabled: true
  referencia: string
  proporcao: number
  auferirpontos: number
  vigenciainicial: string
  vigenciafinal: string
  validadepontos: number
  desprezarfracao: boolean
  isconcederdescontoenabled: boolean
  referenciadesconto: string
  auferirdesconto: number
  isvalorcashbackenabled: boolean
  referenciacashback: string
  auferircashback: number
  ativo: boolean
  itensvinculados: IItens[]
}

interface IBenefitsPostResponse {
  httpstatus: number
  id: string
  message: string
}

const schema = yup.object().shape({})

const BenefitsForm = () => {
  const { pointsOfSale } = usePointsOfSale()

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const toast = useToast()

  const onSubmit = async (values: IBenefitsForm) => {
    setIsLoading(true)
    try {
      const {
        data: { httpstatus, message },
      } = await apiWS.post<IBenefitsPostResponse>('WSBeneficio', values)

      if (httpstatus === 200) {
        return toast({
          title: message,
          status: 'success',
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

  const formik = useFormik({
    initialValues: {
      pontovendaid: '',
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

  const selectPointsOfSale = (value: string) => {
    formik.setFieldValue('pontovendaid', value)
  }

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
              <HStack alignItems={'flex-end'} width={'100%'} spacing={'8'}>
                <Select
                  data={pointsOfSale}
                  handleChange={selectPointsOfSale}
                  width={'100%'}
                />
                <Select
                  data={pointsOfSale}
                  handleChange={selectPointsOfSale}
                  width={'100%'}
                />
              </HStack>
              <HStack width={'100%'} spacing={'8'}>
                <HStack alignItems={'flex-end'} width={'50%'}>
                  <Input
                    pr={110}
                    label={'Descrição'}
                    name={'descricao'}
                    placeholder={'Digite a descrição do benefício.'}
                  />
                </HStack>
                <HStack width={'50%'}>
                  <Input
                    label={'Vigência Inicial'}
                    mask={'99/99/9999'}
                    name={'vigenciainicial'}
                    placeholder={'Digite a data inicial.'}
                  />
                  <Input
                    label={'Vigência Final'}
                    mask={'99/99/9999'}
                    name={'vigenciafinal'}
                    placeholder={'Digite a data final.'}
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
                      chakraVariant="filled"
                      pr={110}
                      label={'Referencia'}
                      placeholder="Selecione a referencia"
                      name={'referenciadesconto'}
                      isDisabled={!formik.values.isconcederdescontoenabled}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      chakraVariant="filled"
                      label={'Desconto'}
                      placeholder="Digite o valor do desconto."
                      name={'auferirdesconto'}
                      isDisabled={!formik.values.isconcederdescontoenabled}
                    />
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
                      placeholder="Selecione a referencia"
                      name={'referenciacashback'}
                      chakraVariant="filled"
                      isDisabled={!formik.values.isvalorcashbackenabled}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      label={'Cashback'}
                      name={'auferircashback'}
                      placeholder="Digite o valor do cashback."
                      chakraVariant="filled"
                      isDisabled={!formik.values.isvalorcashbackenabled}
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
                    <Input
                      pr={110}
                      label={'Referencia'}
                      name={'referencia'}
                      chakraVariant="filled"
                      placeholder="Selecione a referencia"
                      isDisabled={!formik.values.isauferirpontosenabled}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      label={'Proporção'}
                      name={'proporcao'}
                      chakraVariant="filled"
                      placeholder="Digite aqui a proporção."
                      isDisabled={!formik.values.isauferirpontosenabled}
                    />
                  </HStack>
                </HStack>
                <HStack width={'100%'} spacing={'8'}>
                  <HStack width={'50%'}>
                    <Input
                      label={'Quantidade de pontos'}
                      placeholder="Digite a quantidade de pontos."
                      name={'auferirpontos'}
                      chakraVariant="filled"
                      isDisabled={!formik.values.isauferirpontosenabled}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      label={'Validade dos pontos'}
                      name={'validadepontos'}
                      chakraVariant="filled"
                      mask={'99/99/9999'}
                      placeholder="Digite aqui a data de validade."
                      isDisabled={!formik.values.isauferirpontosenabled}
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
                      isDisabled={!formik.values.isauferirpontosenabled}
                    />
                  </HStack>
                </HStack>
              </VStack>
            </SimpleGrid>
            <HStack justifyContent={'flex-end'}>
              <Button text="Cancelar" color="gray" />
              <Button text="Cadastrar" type="submit" />
            </HStack>
          </SimpleGrid>
        </Form>
      </FormikProvider>
    </Box>
  )
}

export default BenefitsForm
