import { useNavigate } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import Button from '../../components/Button'

const Benefits = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Button
        text="Adicionar benefício"
        onClick={() => navigate('/novo-beneficio')}
      />
    </Box>
  )
}

export default Benefits
