import { useNavigate } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import Button from '../../components/Button'

const GroupsOfCompanies = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Button
        text="Adicionar empresa"
        onClick={() => navigate('/novo-grupo')}
      />
    </Box>
  )
}

export default GroupsOfCompanies
