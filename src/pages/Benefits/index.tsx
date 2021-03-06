import { useEffect, useState } from 'react'
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

interface IOptions {
  label: string
  value: string | number
}

const Benefits = () => {
  const navigate = useNavigate()

  const [pointBenefits, setPointBenefits] = useState<Benefit[]>([])
  const [benefitsOptions, setBenefitsOptions] = useState<IOptions[]>([
    {
      label: '',
      value: '',
    },
  ])

  const { pointsOfSale } = usePointsOfSale()

  const getBenefits = (id: string) => {
    const data = [{ updatekind: 996, pontovendaid: `${id}` }]

    apiWS.post('/WSBeneficio', data).then((res) => {
      setPointBenefits(res.data)
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
    setBenefitsOptions(handleOptions())
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
          Regras de Pontuação, Descontos e Cashback
        </Text>
      </Flex>
      <Box px="3rem">
        <Flex justifyContent="space-between" alignItems={'center'} pr="3rem">
          <Select
            options={benefitsOptions}
            placeholder="Selecione um ponto de vendas"
            handleChange={getBenefits}
          />
          <Button
            text="Adicionar benefício"
            onClick={() => navigate('/novo-beneficio')}
          />
        </Flex>
        <Flex pb="3rem">
          <BenefitsTable data={pointBenefits} />
        </Flex>
      </Box>
    </Box>
  )
}

export default Benefits
