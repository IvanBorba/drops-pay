import { useEffect, useState } from 'react'

import { Box, Flex, Text } from '@chakra-ui/react'

import Select from '../../components/Select'
import ClientsTable from '../../components/Tables/ClientsTable'
import { usePointsOfSale } from '../../contexts/points-of-sale'
import { apiWS } from '../../services'

interface GroupOfClients {
  id: string
  pontovendaid: string
  razaosocial: string
  descricao: string
  ativo: string
}

interface IOptions {
  label: string
  value: string | number
}

const GroupsOfClients = () => {
  const [pointGroups, setPointGroups] = useState<GroupOfClients[]>([])
  const [groupOfClientsOptions, setGroupOfClientsOptions] = useState<
    IOptions[]
  >([
    {
      label: '',
      value: '',
    },
  ])

  const { pointsOfSale } = usePointsOfSale()

  const getGroupsOfClients = (id: string) => {
    const data = [{ updatekind: 996, pontovendaid: `${id}` }]

    apiWS.post('/WSGrupoClientes', data).then((res) => {
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
  }, [pointsOfSale])

  return (
    <Box>
      <Flex
        justifyContent="center"
        py="1.5rem"
        mb="3rem"
        boxShadow="0 4px 2px -2px lightgray"
      >
        <Text as="h1" fontWeight="bold" fontSize="lg">
          Grupos de Clientes
        </Text>
      </Flex>
      <Box px="3rem">
        <Flex>
          <Select
            options={groupOfClientsOptions}
            placeholder="Selecione um ponto de vendas"
            handleChange={getGroupsOfClients}
          />
          <Text ml="15rem">Adicionar Grupo de Clientes</Text>
        </Flex>
        <Flex>
          <ClientsTable data={pointGroups} />
        </Flex>
      </Box>
    </Box>
  )
}
export default GroupsOfClients
