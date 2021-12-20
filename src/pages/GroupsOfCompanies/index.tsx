import { useNavigate } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import Button from '../../components/Button'
import Table from '../../components/Table'
import { useCompanies } from '../../contexts/companies'

const GroupsOfCompanies = () => {
  const navigate = useNavigate()

  const { companies } = useCompanies()
  return (
    <Box px="3rem">
      <Button
        text="Adicionar empresa"
        onClick={() => navigate('/novo-grupo')}
      />
      <Table data={companies} />
    </Box>
  )
}

export default GroupsOfCompanies
