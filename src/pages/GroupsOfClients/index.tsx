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
  }, [])

  return (
    <Box px="3rem">
      <Text as="h1" fontWeight="bold" mb="2rem">
        Grupos de Clientes
      </Text>
      <Flex>
        <Select
          options={groupOfClientsOptions}
          placeholder="Selecione o ponto de vendas"
          handleChange={getGroupsOfClients}
        />
        <Text ml="15rem">Adicionar Grupo de Clientes</Text>
      </Flex>
      <Flex>
        <ClientsTable data={pointGroups} />
      </Flex>
    </Box>
  )
}
export default GroupsOfClients
