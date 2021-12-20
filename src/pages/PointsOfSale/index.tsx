import { useNavigate } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import Button from '../../components/Button'
import Table from '../../components/Table'
import { usePointsOfSale } from '../../contexts/points-of-sale'

const PointsOfSale = () => {
  const navigate = useNavigate()

  const { pointsOfSale } = usePointsOfSale()
  return (
    <Box px="3rem">
      <Button
        text="Adicionar ponto"
        onClick={() => navigate('/novo-ponto-de-venda')}
      />
      <Table data={pointsOfSale} />
    </Box>
  )
}

export default PointsOfSale
