import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Flex, Text } from '@chakra-ui/react'

import Button from '../../components/Button'
import Select from '../../components/Select'
import BenefitsTable from '../../components/Tables/BenefitsTable'
import { usePointsOfSale } from '../../contexts/points-of-sale'
import { apiWS } from '../../services'

interface Benefit {
  id: string
  pontovendaid: string
  razaosocial: string
  grupoclientesid: string
  grupoclientesdescricao: string
  descricao: string
  isauferirpontosenabled: string
  referencia: string
  proporcao: string
  auferirpontos: string
  vigenciainicial: string
  vigenciafinal: string
  validadepontos: string
  desprezarfracao: string
  isconcederdescontoenabled: string
  referenciadesconto: string
  auferirdesconto: string
  isvalorcashbackenabled: string
  referenciacashback: string
  auferircashback: string
  ativo: string
  itensvinculados: string
}

const Benefits = () => {
  const navigate = useNavigate()

  const [benefits, setBenefits] = useState<Benefit[]>([])

  const { pointsOfSale } = usePointsOfSale()

  const getBenefits = (id: string) => {
    const data = [{ updatekind: 996, pontovendaid: `${id}` }]

    apiWS.post('/WSBeneficio', data).then((res) => {
      setBenefits(res.data)
    })
  }

  return (
    <Box px="3rem">
      <Text as="h1" fontWeight="bold" mb="2rem">
        Regras de Pontuação, Descontos e Cashback
      </Text>
      <Flex justifyContent="space-between">
        <Select data={pointsOfSale} onChange={getBenefits} />
        <Button
          text="Adicionar benefício"
          onClick={() => navigate('/novo-beneficio')}
        />
      </Flex>
      <Flex>
        <BenefitsTable data={benefits} />
      </Flex>
    </Box>
  )
}

export default Benefits
