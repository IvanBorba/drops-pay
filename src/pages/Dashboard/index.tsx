import { Box, Flex, Text } from '@chakra-ui/react'

import InfoCard from '../../components/InfoCard'
import { useCompanies } from '../../contexts/companies'
import { usePointsOfSale } from '../../contexts/points-of-sale'

const Dashboard = () => {
  const { pointsOfSale } = usePointsOfSale()
  const { companies } = useCompanies()

  return (
    <Box>
      <Flex
        justifyContent="center"
        py="1.5rem"
        mb="3rem"
        boxShadow="0 4px 2px -2px lightgray"
      >
        <Text as="h1" fontWeight="bold" fontSize="lg">
          Dashboard
        </Text>
      </Flex>
      <Box px="3rem">
        <Flex>
          <InfoCard
            number={companies.length}
            text="Grupos de Empresas Cadastrados"
            page="grupos-de-empresas"
          />
          <InfoCard
            number={pointsOfSale.length}
            text="Pontos de Venda Cadastrados"
            page="pontos-de-venda"
          />
        </Flex>
      </Box>
    </Box>
  )
}

export default Dashboard
