import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Flex } from '@chakra-ui/react'

import Button from '../../components/Button'
import SearchInput from '../../components/SearchInput'
import Table from '../../components/Table'
import { usePointsOfSale } from '../../contexts/points-of-sale'
import removeEspecialCharacter from '../../utils/removeEspecialCharacter'

interface PointOfSale {
  ativo: boolean
  avaliacao: number
  bairroid: number
  cep: string
  cidadeid: number
  cidadenome: string
  cnpj: string
  complemento: string
  horariofuncionamento: Record<string, unknown>[]
  id: number
  imagebandeira: string
  imagepontovenda: string
  latitude: number
  logradouro: string
  longitude: number
  nomefantasia: string
  numero: number
  produtos: Record<string, unknown>[]
  razaosocial: string
  uf: string
  ufnome: string
}

const PointsOfSale = () => {
  const navigate = useNavigate()

  const [filteredPointsOfSale, setFilteredPointsOfSale] = useState<
    PointOfSale[] | Record<string, string | number | boolean>[]
  >([])

  const [cnpjFilter, setCnpjFilter] = useState<string>('')
  const [nameFilter, setNameFilter] = useState<string>('')

  const { pointsOfSale } = usePointsOfSale()

  useEffect(() => {
    if (cnpjFilter !== '') {
      setFilteredPointsOfSale(
        pointsOfSale.filter((item) => item.cnpj.includes(cnpjFilter))
      )
    } else {
      setFilteredPointsOfSale([])
    }
  }, [cnpjFilter, pointsOfSale])

  useEffect(() => {
    if (nameFilter !== '') {
      setFilteredPointsOfSale(
        pointsOfSale.filter((item) =>
          item.razaosocial.toLowerCase().includes(nameFilter.toLowerCase())
        )
      )
    } else {
      setFilteredPointsOfSale([])
    }
  }, [nameFilter, pointsOfSale])

  return (
    <Box px="3rem">
      <Flex justifyContent="space-evenly">
        <Button
          text="Adicionar ponto"
          onClick={() => navigate('/novo-ponto-de-venda')}
        />
        <SearchInput
          text="Buscar por Razão Social"
          onChange={(e) => {
            setNameFilter(removeEspecialCharacter(e.target.value))
            setCnpjFilter('')
          }}
          value={nameFilter}
        />
        <SearchInput
          text="Buscar por CNPJ"
          onChange={(e) => {
            setCnpjFilter(removeEspecialCharacter(e.target.value))
            setNameFilter('')
          }}
          value={cnpjFilter}
          cnpj
        />
      </Flex>
      <Table
        data={
          filteredPointsOfSale.length > 0 ? filteredPointsOfSale : pointsOfSale
        }
      />
    </Box>
  )
}

export default PointsOfSale
