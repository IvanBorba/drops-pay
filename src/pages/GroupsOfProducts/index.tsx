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
    <Box>
      <Flex
        justifyContent="center"
        py="1.5rem"
        mb="3rem"
        boxShadow="0 4px 2px -2px lightgray"
      >
        <Text as="h1" fontWeight="bold" fontSize="lg">
          Grupos de Produtos
        </Text>
      </Flex>
      <Box px="3rem">
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
    </Box>
  )
}

export default GroupsOfProducts
