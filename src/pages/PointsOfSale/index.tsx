import { useNavigate } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import Button from '../../components/Button'

const PointsOfSale = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Button
        text="Adicionar ponto"
        onClick={() => navigate('/novo-ponto-de-venda')}
      />
    </Box>
  )
}

export default PointsOfSale
