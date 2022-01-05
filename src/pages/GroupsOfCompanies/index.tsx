import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Flex, Text } from '@chakra-ui/react'

import Button from '../../components/Button'
import SearchInput from '../../components/SearchInput'
import Table from '../../components/Tables/CompaniesAndPointsOfSaleTable'
import { useCompanies } from '../../contexts/companies'
import removeEspecialCharacter from '../../utils/removeEspecialCharacter'

interface Company {
  ativo: boolean
  bairroid: number
  cep: string
  cidadeid: number
  cidadenome: string
  cnpj: string
  complemento: string
  id: number
  logradouro: string
  numero: number
  razaosocial: string
  uf: string
  ufnome: string
}

const GroupsOfCompanies = () => {
  const navigate = useNavigate()

  const [filteredCompanies, setFilteredCompanies] = useState<
    Company[] | Record<string, string | number | boolean>[]
  >([])

  const [cnpjFilter, setCnpjFilter] = useState<string>('')
  const [nameFilter, setNameFilter] = useState<string>('')

  const { companies } = useCompanies()

  useEffect(() => {
    if (cnpjFilter !== '') {
      setFilteredCompanies(
        companies.filter((item) => item.cnpj.includes(cnpjFilter))
      )
    } else {
      setFilteredCompanies([])
    }
  }, [cnpjFilter, companies])

  useEffect(() => {
    if (nameFilter !== '') {
      setFilteredCompanies(
        companies.filter((item) =>
          item.razaosocial.toLowerCase().includes(nameFilter.toLowerCase())
        )
      )
    } else {
      setFilteredCompanies([])
    }
  }, [nameFilter, companies])

  return (
    <Box>
      <Flex
        justifyContent="center"
        py="1.5rem"
        mb="3rem"
        boxShadow="0 4px 2px -2px lightgray"
      >
        <Text as="h1" fontWeight="bold" fontSize="lg">
          Grupos de Empresas
        </Text>
      </Flex>
      <Box px="3rem">
        <Flex justifyContent="space-evenly">
          <Button
            text="Adicionar empresa"
            onClick={() => navigate('/novo-grupo')}
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
          data={filteredCompanies.length > 0 ? filteredCompanies : companies}
        />
      </Box>
    </Box>
  )
}

export default GroupsOfCompanies
