import { useEffect, useState } from 'react'

import { Box, Flex, Text } from '@chakra-ui/react'

import Select from '../../components/Select'
import ProductsTable from '../../components/Tables/ProductsTable'
import { usePointsOfSale } from '../../contexts/points-of-sale'
import { apiWS } from '../../services'

interface GroupOfProducts {
  uid: string
  classificacao: string
  tipo: string
  tipodescricao: string
  descricao: string
}

interface IOptions {
  label: string
  value: string | number
}

const GroupsOfProducts = () => {
  const [pointGroups, setPointGroups] = useState<GroupOfProducts[]>([])
  const [groupOfClientsOptions, setGroupOfClientsOptions] = useState<
    IOptions[]
  >([
    {
      label: '',
      value: '',
    },
  ])

  const { pointsOfSale } = usePointsOfSale()

  const getGroupsOfProducts = (id: string) => {
    const data = [{ updatekind: 996, pontovendaid: `${id}` }]

    apiWS.post('/WSGrupoProdutos', data).then((res) => {
      setPointGroups(res.data)
    })
  }

  const handleOptions = (): IOptions[] => {
    return pointsOfSale.map((point) => {
      return {
        label: point.razaosocial,
        value: point.id,
      }
    })
  }

  useEffect(() => {
    setGroupOfClientsOptions(handleOptions())
  }, [])

  return (
    <Box px="3rem">
      <Text as="h1" fontWeight="bold" mb="2rem">
        Grupos de Produtos
      </Text>
      <Flex>
        <Select
          options={groupOfClientsOptions}
          placeholder="Selecione um ponto de vendas"
          handleChange={getGroupsOfProducts}
        />
      </Flex>
      <Flex>
        <ProductsTable data={pointGroups} />
      </Flex>
    </Box>
  )
}

export default GroupsOfProducts
