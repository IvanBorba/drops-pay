import { useEffect, useState } from 'react'
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
  grupoclientesid: string
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

interface IOptions {
  label: string
  value: string | number
}

interface IGroupClients {
  id: number
  pontovendaid: number
  razaosocial: string
  descricao: string
  ativo: string
}

interface IGroupOfProducts {
  uid: string
  classificacao: string
  tipo: string
  tipodescricao: string
  descricao: string
}

const schema = yup.object().shape({})

const BenefitsForm = () => {
  const [groupOfClients, setGroupOfClients] = useState<IGroupClients[]>([])
  const [pointsOfSaleOptions, setPointsOfSaleOptions] = useState<IOptions[]>([
    {
      label: '',
      value: '',
    },
  ])
  const [productsOptions, setProductsOptions] = useState<IOptions[]>([])
  const [products, setProducts] = useState<IGroupOfProducts[]>([])
  const [GroupOfClientsOptions, setGroupOfClientsOptions] =
    useState<IOptions[]>()

  const { pointsOfSale } = usePointsOfSale()

  const handleOptions = (): IOptions[] => {
    return pointsOfSale.map((point) => {
      return {
        label: point.razaosocial,
        value: point.id,
      }
    })
  }

  useEffect(() => {
    setPointsOfSaleOptions(handleOptions())
  }, [pointsOfSale])

  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const onSubmit = async (values: IBenefitsForm) => {
    console.log(values)
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
      grupoclientesid: '',
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
      itensvinculados: [
        {
          uid: '',
        },
      ],
    },
    validationSchema: schema,
    onSubmit,
  })

  const handleGroupOfClients = async (id: number) => {
    setIsLoading(true)
    try {
      const { data } = await apiWS.post<IGroupClients[]>('/WSGrupoClientes', {
        updatekind: 996,
        pontovendaid: id,
      })

      setGroupOfClients(data)

      setGroupOfClientsOptions(
        data.map((group) => {
          return {
            label: group.descricao,
            value: group.id,
          }
        })
      )
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

  const handleProducts = async (id: number) => {
    setIsLoading(true)
    try {
      const { data } = await apiWS.post<IGroupOfProducts[]>(
        '/WSGrupoProdutos',
        {
          updatekind: 996,
          pontovendaid: id,
        }
      )

      setProducts(data)

      setProductsOptions(
        data.map((group) => {
          return {
            label: group.descricao,
            value: group.uid,
          }
        })
      )
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

  const templateColumns = useBreakpointValue({
    lg: '4fr',
    '2xl': '2fr 2fr',
  })

  const selectPointsOfSale = (value: string) => {
    formik.setFieldValue('pontovendaid', parseInt(value))
    handleGroupOfClients(parseInt(value))
    handleProducts(parseInt(value))
  }

  const selectGroupOfClients = (value: string) => {
    formik.setFieldValue('grupoclientesid', parseInt(value))
  }

  const selectDiscoutReference = (value: string) => {
    formik.setFieldValue('referenciadesconto', value)
  }

  const selectCashbackReference = (value: string) => {
    formik.setFieldValue('referenciacashback', value)
  }

  const selectPointsReference = (value: string) => {
    formik.setFieldValue('referencia', value)
  }

  const selectItens = (value: string, idx: number) => {
    formik.setFieldValue(`itensvinculados[${idx}].uid`, value)
  }

  const addItens = () => {
    formik.setFieldValue('itensvinculados', [
      ...formik.values.itensvinculados,
      { uid: '' },
    ])
  }

  const removeItem = (removeIdx: number) => {
    console.log(
      removeIdx,
      formik.values.itensvinculados.filter((_, idx) => idx !== removeIdx)
    )
    formik.setFieldValue(
      'itensvinculados',
      formik.values.itensvinculados.filter((_, idx) => idx !== removeIdx)
    )
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
                  options={pointsOfSaleOptions}
                  placeholder="Selecione o ponto de vendas"
                  handleChange={selectPointsOfSale}
                  width={'100%'}
                />
                <Select
                  options={GroupOfClientsOptions || [{ label: '', value: '' }]}
                  placeholder="Selecione o grupo de clientes"
                  handleChange={selectGroupOfClients}
                  width={'100%'}
                  isDisabled={!GroupOfClientsOptions?.length}
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
                    <Select
                      options={[
                        { label: 'Em valor', value: 'em valor' },
                        { label: 'Em percentual', value: 'em percentual' },
                      ]}
                      placeholder="Selecione a referencia"
                      handleChange={selectDiscoutReference}
                      width={'100%'}
                      isDisabled={!formik.values.isconcederdescontoenabled}
                      variant={'filled'}
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
                    <Select
                      options={[
                        { label: 'Em valor', value: 'em valor' },
                        { label: 'Em percentual', value: 'em percentual' },
                      ]}
                      placeholder="Selecione a referencia"
                      handleChange={selectCashbackReference}
                      width={'100%'}
                      isDisabled={!formik.values.isvalorcashbackenabled}
                      variant={'filled'}
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
                    <Select
                      options={[
                        { label: 'Valor', value: 'valor' },
                        { label: 'Quantidade', value: 'quantidade' },
                      ]}
                      placeholder="Selecione a referencia"
                      handleChange={selectPointsReference}
                      width={'100%'}
                      isDisabled={!formik.values.isauferirpontosenabled}
                      variant={'filled'}
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
              <VStack>
                {formik.values.itensvinculados?.map((_, idx) => (
                  <HStack
                    key={idx}
                    width={'100%'}
                    spacing={'8'}
                    justifyContent={'flex-start'}
                  >
                    <Select
                      options={productsOptions}
                      placeholder="Selecione a referencia"
                      handleChange={(value: string) => selectItens(value, idx)}
                      width={'100%'}
                      isDisabled={!productsOptions.length}
                      variant={'filled'}
                      value={formik.values.itensvinculados[idx].uid}
                    />

                    <Button
                      text="X "
                      color="gray"
                      width={'18'}
                      onClick={() => removeItem(idx)}
                    />
                    {idx === formik.values.itensvinculados.length - 1 && (
                      <Button text="+" width={'18'} onClick={addItens} />
                    )}
                  </HStack>
                ))}
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
