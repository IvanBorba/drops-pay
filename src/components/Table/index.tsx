import { useState } from 'react'

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

import Button from '../Button'

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
  variant?: string
}

const Table = ({ data, variant = 'default' }: IProps) => {
  const [headers] = useState<string[]>(
    variant === 'default'
      ? ['Status', 'Razão Social', 'CNPJ', 'UF', 'Cidade', 'Endereço', 'Opções']
      : variant === 'products'
      ? ['id', 'Descrição', 'Grupo de Produtos', 'Preço Unitário', 'Opções']
      : [
          'Ponto de venda',
          'Descrição',
          'Referência',
          'Proporção',
          'Pontos',
          'Desconto',
          'Cashback',
          'Vigência Inicial',
          'Vigência Final',
          'Opções',
        ]
  )

  return (
    <ChakraTable
      variant="striped"
      color="grey.400"
      colorScheme="table"
      mt="2rem"
      borderRadius="3.45px"
      boxShadow="rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;"
    >
      <Thead bg="grey.300" height="47px">
        <Tr>
          {headers.map((item, index) => (
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
        {data.map((item) => {
          if (variant === 'default') {
            return (
              <Tr>
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
                  <Button text="Mais" onClick={() => ''} variant="small" />
                </Td>
              </Tr>
            )
          }
        })}
      </Tbody>
    </ChakraTable>
  )
}

export default Table
