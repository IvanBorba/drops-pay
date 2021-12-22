import { useEffect, useState } from 'react'

import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import Button from '../../Button'

interface GroupOfProducts {
  uid: string
  classificacao: string
  tipo: string
  tipodescricao: string
  descricao: string
}

interface IProps {
  data: GroupOfProducts[]
}

const ProductsTable = ({ data }: IProps) => {
  const [att, setAtt] = useState<number>(0)

  useEffect(() => {
    setAtt(att + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Table
      width="60rem"
      variant="striped"
      color="grey.400"
      colorScheme="table"
      mt="2rem"
      borderRadius="3.45px"
      boxShadow="rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;"
    >
      <Thead bg="grey.300" height="47px">
        <Tr>
          {['Tipo', 'Descrição', 'Classificação', 'Opções'].map(
            (item, index) => (
              <Th
                key={index}
                fontWeight="bold"
                lineHeight="23px"
                letterSpacing="0.2px"
                color="grey.400"
              >
                {item}
              </Th>
            )
          )}
        </Tr>
      </Thead>
      <Tbody fontSize="sm">
        {data.map((item, index) => {
          return (
            <Tr key={index}>
              <Td height="47px">{item.tipodescricao}</Td>
              <Td height="47px">{item.descricao}</Td>
              <Td height="47px">{item.classificacao}</Td>
              <Td width="8rem">
                <Button text="Mais" onClick={() => ''} variant="small" />
              </Td>
            </Tr>
          )
        })}
        {data.length === 0 && (
          <Tr>
            <Td fontSize="xs">
              Selecione um Ponto de Vendas com Grupos de Produtos
            </Td>
            <Td textAlign="center" width="8rem">
              -
            </Td>
            <Td textAlign="center" width="8rem">
              -
            </Td>
            <Td textAlign="center" width="6rem">
              -
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  )
}

export default ProductsTable
