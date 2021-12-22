import { useState } from 'react'

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

const GroupsOfProducts = () => {
  const [pointGroups, setPointGroups] = useState<GroupOfProducts[]>([])

  const { pointsOfSale } = usePointsOfSale()

  const getGroupsOfProducts = (id: string) => {
    const data = [{ updatekind: 996, pontovendaid: `${id}` }]

    apiWS.post('/WSGrupoProdutos', data).then((res) => {
      setPointGroups(res.data)
    })
  }

  return (
    <Box px="3rem">
      <Text as="h1" fontWeight="bold" mb="2rem">
        Grupos de Produtos
      </Text>
      <Flex>
        <Select data={pointsOfSale} onChange={getGroupsOfProducts} />
      </Flex>
      <Flex>
        <ProductsTable data={pointGroups} />
      </Flex>
    </Box>
  )
}

export default GroupsOfProducts
