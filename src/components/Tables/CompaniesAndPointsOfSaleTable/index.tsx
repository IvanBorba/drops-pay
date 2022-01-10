import {
  Box,
  Flex,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

import Button from '../../Button'

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

interface IProps {
  data: Record<string, string | number | boolean>[] | Company[]
}

const CompaniesAndPointsOfSaleTable = ({ data }: IProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <ChakraTable
      variant="striped"
      color="grey.400"
      colorScheme="table"
      mt="2rem"
      borderRadius="3.45px"
      boxShadow="rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;"
    >
      <Thead>
        <Tr>
          {[
            'Status',
            'Razão Social',
            'CNPJ',
            'UF',
            'Cidade',
            'Endereço',
            'Opções',
          ].map((item, index) => (
            <Th
              key={index}
              fontWeight="bold"
              lineHeight="23px"
              letterSpacing="0.2px"
              color="grey.400"
            >
              {item}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody fontSize="sm">
        {data.map((item, index) => {
          return (
            <Tr key={index}>
              <Td height="47px" width="80px" px="0">
                {item.ativo === true || item.ativo === 1 ? (
                  <Flex justifyContent="center">
                    <Box
                      borderRadius="30px"
                      bg="green.500"
                      width="60px"
                      minWidth="60px"
                      height="20px"
                      fontSize="sm"
                      color="white"
                      textAlign="center"
                      userSelect="none"
                    >
                      Ativo
                    </Box>
                  </Flex>
                ) : (
                  <Flex justifyContent="center">
                    <Box
                      borderRadius="30px"
                      bg="#F32013"
                      width="60px"
                      minWidth="60px"
                      height="20px"
                      fontSize="sm"
                      color="white"
                      textAlign="center"
                      userSelect="none"
                    >
                      Inativo
                    </Box>
                  </Flex>
                )}
              </Td>
              <Td height="47px">{item.razaosocial}</Td>
              <Td>{item.cnpj}</Td>
              <Td>{item.uf}</Td>
              <Td>{item.cidadenome}</Td>
              <Td>
                {item.logradouro}, {item.numero}
              </Td>
              <Td>
                <Button
                  text="Editar"
                  onClick={
                    location.pathname === '/grupos-de-empresas'
                      ? () => navigate(`/grupo-de-empresa/${item.id}`)
                      : () => navigate(`/ponto-de-venda/${item.id}`)
                  }
                  variant="small"
                />
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </ChakraTable>
  )
}

export default CompaniesAndPointsOfSaleTable
