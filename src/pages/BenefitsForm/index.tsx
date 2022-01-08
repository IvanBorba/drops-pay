import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
import { stringify } from 'querystring'
import * as yup from 'yup'

import Button from '../../components/Button'
import { Input } from '../../components/Form/Input'
import { Loading } from '../../components/Loading'
import Select from '../../components/Select'
import { usePointsOfSale } from '../../contexts/points-of-sale'
import { apiWS } from '../../services'
import { formatDate } from '../../utils/formatDate'

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
  ativo: boolean
  itensvinculados: IProducts[]
}

interface IItens {
  uid: string
}

interface IBenefitsData {
  updatekind: number
  id: number
  pontovendaid: number
  razaosocial: string
  grupoclientesid: number
  grupoclientesdescricao: string
  descricao: string
  isauferirpontosenabled: boolean
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

const schema = yup.object().shape({
  pontovendaid: yup.string().required('Campo obrigatório.'),
  grupoclientesid: yup.string().required('Campo obrigatório.'),
  grupoclientesdescricao: yup.string().required('Campo obrigatório.'),
  descricao: yup.string().required('Campo obrigatório.'),
  referencia: yup.string().when('isauferirpontosenabled', {
    is: true,
    then: (schema) => schema.required('Campo Obrigatório'),
  }),

  proporcao: yup.string().when('isauferirpontosenabled', {
    is: true,
    then: (schema) => schema.required('Campo Obrigatório'),
  }),
  auferirpontos: yup.string().when('isauferirpontosenabled', {
    is: true,
    then: (schema) => schema.required('Campo Obrigatório'),
  }),
  vigenciainicial: yup.string().required('Campo obrigatório.'),
  vigenciafinal: yup.string().required('Campo obrigatório.'),
  validadepontos: yup.string().when('isauferirpontosenabled', {
    is: true,
    then: (schema) => schema.required('Campo Obrigatório'),
  }),
  referenciadesconto: yup.string().when('isconcederdescontoenabled', {
    is: true,
    then: (schema) => schema.required('Campo Obrigatório'),
  }),
  auferirdesconto: yup.string().when('isconcederdescontoenabled', {
    is: true,
    then: (schema) => schema.required('Campo Obrigatório'),
  }),
  referenciacashback: yup.string().when('isvalorcashbackenabled', {
    is: true,
    then: (schema) => schema.required('Campo Obrigatório'),
  }),
  auferircashback: yup.string().when('isvalorcashbackenabled', {
    is: true,
    then: (schema) => schema.required('Campo Obrigatório'),
  }),
})

const BenefitsForm = () => {
  const [isEdit, setIdEdit] = useState(false)
  const [groupOfClients, setGroupOfClients] = useState<IGroupClients[]>([])
  const [pointsOfSaleOptions, setPointsOfSaleOptions] = useState<IOptions[]>([
    {
      label: '',
      value: '',
    },
  ])
  const [productsOptions, setProductsOptions] = useState<IOptions[]>([])
  const [isLoading, setIsLoading] = useState(false)
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

  const getBenefit = async (id: string) => {
    setIsLoading(true)

    try {
      const params = { updatekind: 996, pontovendaid: 1 }

      const { data } = await apiWS.post<IBenefitsData[]>('/WSBeneficio', params)

      const [benefit] = data.filter((benefit) => benefit.id === parseInt(id))

      const {
        ativo,
        auferircashback,
        auferirdesconto,
        auferirpontos,
        descricao,
        desprezarfracao,
        grupoclientesdescricao,
        grupoclientesid,
        isauferirpontosenabled,
        isconcederdescontoenabled,
        isvalorcashbackenabled,
        itensvinculados,
        pontovendaid,
        proporcao,
        referencia,
        referenciacashback,
        referenciadesconto,
        validadepontos,
        vigenciafinal,
        vigenciainicial,
      } = benefit

      formik.setValues({
        ativo,
        auferircashback: String(auferircashback),
        auferirdesconto: String(auferirdesconto),
        auferirpontos: String(auferirpontos),
        descricao,
        desprezarfracao,
        grupoclientesdescricao,
        grupoclientesid: String(grupoclientesid),
        isauferirpontosenabled,
        isconcederdescontoenabled,
        isvalorcashbackenabled,
        itensvinculados,
        pontovendaid: String(pontovendaid),
        proporcao: String(proporcao),
        referencia,
        referenciacashback,
        referenciadesconto,
        validadepontos: String(validadepontos),
        vigenciafinal,
        vigenciainicial,
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

  useEffect(() => {
    setPointsOfSaleOptions(handleOptions())
  }, [pointsOfSale])

  const toast = useToast()

  const params = useParams()

  useEffect(() => {
    if (params.id) {
      setIdEdit(true)
      getBenefit(params.id)
    }
  }, [params.id])

  const navigate = useNavigate()

  const onSubmit = async (values: IBenefitsForm) => {
    setIsLoading(true)
    try {
      if (values.itensvinculados[0].uid === '') {
        return toast({
          title: 'É necessario vincular pelo menos 1 produto.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }

      const data: IBenefitsData = {
        updatekind: 1,
        id: isEdit ? parseInt(params.id || '0') : 0,
        pontovendaid: parseInt(values.pontovendaid),
        razaosocial:
          pointsOfSale.find(
            (point) => point.id === parseInt(values.pontovendaid)
          )?.razaosocial || '',
        grupoclientesid: parseInt(values.grupoclientesid),
        grupoclientesdescricao: values.grupoclientesdescricao,
        descricao: values.descricao,
        isauferirpontosenabled: values.isauferirpontosenabled,
        referencia: values.referencia,
        proporcao: parseInt(values.proporcao) || 0,
        auferirpontos: parseInt(values.auferirpontos) || 0,
        vigenciainicial: formatDate(values.vigenciainicial),
        vigenciafinal: formatDate(values.vigenciafinal),
        validadepontos: parseInt(values.validadepontos) || 0,
        desprezarfracao: values.desprezarfracao,
        isconcederdescontoenabled: values.isconcederdescontoenabled,
        referenciadesconto: values.referenciadesconto,
        auferirdesconto: parseInt(values.auferirdesconto) || 0,
        isvalorcashbackenabled: values.isvalorcashbackenabled,
        referenciacashback: values.referenciacashback,
        auferircashback: parseInt(values.auferircashback) || 0,
        ativo: values.ativo,
        itensvinculados: values.itensvinculados,
      }

      const {
        data: { httpstatus, message },
      } = await apiWS.post<IBenefitsPostResponse>('WSBeneficio', data)

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

  const handleCancel = () => {
    formik.resetForm()
    navigate('/beneficios')
  }
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
    formik.setFieldValue(
      'grupoclientesdescricao',
      groupOfClients.find((group) => group.id === parseInt(value))?.descricao
    )
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
    if (removeIdx !== 0) {
      formik.setFieldValue(
        'itensvinculados',
        formik.values.itensvinculados.filter((_, idx) => idx !== removeIdx)
      )
    }
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
                  label="Ponto de vendas"
                  options={pointsOfSaleOptions}
                  placeholder="Selecione o ponto de vendas"
                  handleChange={selectPointsOfSale}
                  width={'100%'}
                  value={formik.values.pontovendaid}
                  errorMessage={formik.errors.pontovendaid}
                />
                <Select
                  label="Grupo de clientes"
                  options={GroupOfClientsOptions || [{ label: '', value: '' }]}
                  placeholder="Selecione o grupo de clientes"
                  handleChange={selectGroupOfClients}
                  width={'100%'}
                  isDisabled={!GroupOfClientsOptions?.length}
                  value={formik.values.grupoclientesid}
                  errorMessage={formik.errors.grupoclientesid}
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
                      label="Referencia"
                      options={[
                        { label: 'Em valor', value: 'V' },
                        { label: 'Em percentual', value: 'P' },
                      ]}
                      placeholder="Selecione a referencia"
                      handleChange={selectDiscoutReference}
                      width={'100%'}
                      isDisabled={!formik.values.isconcederdescontoenabled}
                      variant={'filled'}
                      errorMessage={formik.errors.referenciadesconto}
                      value={formik.values.referenciadesconto}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      chakraVariant="filled"
                      label={'Desconto'}
                      placeholder="Digite o valor do desconto."
                      name={'auferirdesconto'}
                      type={'number'}
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
                      label="Referencia"
                      options={[
                        { label: 'Em valor', value: 'V' },
                        { label: 'Em percentual', value: 'P' },
                      ]}
                      placeholder="Selecione a referencia"
                      handleChange={selectCashbackReference}
                      width={'100%'}
                      isDisabled={!formik.values.isvalorcashbackenabled}
                      variant={'filled'}
                      errorMessage={formik.errors.referenciacashback}
                      value={formik.values.referenciacashback}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      label={'Cashback'}
                      name={'auferircashback'}
                      placeholder="Digite o valor do cashback."
                      chakraVariant="filled"
                      type={'number'}
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
                      label="Referencia"
                      options={[
                        { label: 'Valor', value: 'V' },
                        { label: 'Quantidade', value: 'Q' },
                      ]}
                      placeholder="Selecione a referencia"
                      handleChange={selectPointsReference}
                      width={'100%'}
                      isDisabled={!formik.values.isauferirpontosenabled}
                      variant={'filled'}
                      errorMessage={formik.errors.referencia}
                      value={formik.values.referencia}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      label={'Proporção'}
                      name={'proporcao'}
                      chakraVariant="filled"
                      type={'number'}
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
                      type={'number'}
                      chakraVariant="filled"
                      isDisabled={!formik.values.isauferirpontosenabled}
                    />
                  </HStack>
                  <HStack width={'50%'}>
                    <Input
                      label={'Validade dos pontos'}
                      name={'validadepontos'}
                      chakraVariant="filled"
                      type="number"
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
                      label={idx === 0 ? 'Produto' : undefined}
                      options={productsOptions}
                      placeholder="Selecione um produto"
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
              <Button text="Cancelar" color="gray" onClick={handleCancel} />
              <Button text={isEdit ? 'Salvar' : 'Cadastrar'} type="submit" />
            </HStack>
          </SimpleGrid>
        </Form>
      </FormikProvider>
    </Box>
  )
}

export default BenefitsForm
