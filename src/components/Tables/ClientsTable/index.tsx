import { useEffect, useState } from 'react'

import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import Button from '../../Button'

interface GroupOfClients {
  id: string
  pontovendaid: string
  razaosocial: string
  descricao: string
  ativo: string
}

interface IProps {
  data: GroupOfClients[]
}

const ClientsTable = ({ data }: IProps) => {
  const [att, setAtt] = useState<number>(0)

  useEffect(() => {
    setAtt(att + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Table
      width="30rem"
      variant="striped"
      color="grey.400"
      colorScheme="table"
      mt="2rem"
      borderRadius="3.45px"
      boxShadow="rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;"
    >
      <Thead bg="grey.300" height="47px">
        <Tr>
          {['Status', 'Descrição', 'Opções'].map((item, index) => (
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
                {item.ativo === 'true' ? (
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
              <Td height="47px">{item.descricao}</Td>
              <Td width="8rem">
                <Button text="Mais" onClick={() => ''} variant="small" />
              </Td>
            </Tr>
          )
        })}
        {data.length === 0 && (
          <Tr>
            <Td fontSize="xs">
              Selecione um Ponto de Vendas com Grupos de Clientes Cadastrados
            </Td>
            <Td textAlign="center">-</Td>
            <Td textAlign="center">-</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  )
}

export default ClientsTable
