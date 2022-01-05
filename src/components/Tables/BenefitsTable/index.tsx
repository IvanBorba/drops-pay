import { FaCheck, FaTimesCircle } from 'react-icons/fa'

import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import Button from '../../Button'

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

interface IProps {
  data: Benefit[]
}

const BenefitsTable = ({ data }: IProps) => {
  return (
    <Table
      variant="striped"
      color="grey.400"
      colorScheme="table"
      mt="2rem"
      borderRadius="3.45px"
      boxShadow="rgba(73, 33, 33, 0.25) 0px 25px 50px -12px;"
    >
      <Thead>
        <Tr>
          {[
            'Produto (Descrição)',
            'Vigência Inicial',
            'Vigência Final',
            'Referência',
            'Proporção',
            'Pontos',
            'Desconto',
            'Cashback',
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
              <Td height="47px">{item.descricao}</Td>
              <Td height="47px">{item.vigenciainicial}</Td>
              <Td height="47px">{item.vigenciafinal}</Td>
              <Td height="47px">
                {item.referencia === 'V'
                  ? 'Valor'
                  : item.referencia === 'Q'
                  ? 'Quantidade'
                  : item.referencia === 'P'
                  ? 'Por cento'
                  : 'Não cadastrada'}
              </Td>
              <Td height="47px">{item.proporcao}</Td>
              <Td height="47px" py="auto">
                {item.isauferirpontosenabled ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimesCircle color="red" />
                )}
              </Td>
              <Td height="47px">
                {item.isconcederdescontoenabled ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimesCircle color="red" />
                )}
              </Td>
              <Td height="47px">
                {item.isvalorcashbackenabled ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimesCircle color="red" />
                )}
              </Td>
              <Td width="8rem">
                <Button text="Mais" onClick={() => ''} variant="small" />
              </Td>
            </Tr>
          )
        })}
        {data.length === 0 && (
          <Tr>
            <Td fontSize="xs">
              Selecione um Ponto de Vendas com Benefícios Cadastrados
            </Td>
            <Td textAlign="center">-</Td>
            <Td textAlign="center">-</Td>
            <Td textAlign="center">-</Td>
            <Td textAlign="center">-</Td>
            <Td textAlign="center">-</Td>
            <Td textAlign="center">-</Td>
            <Td textAlign="center">-</Td>
            <Td textAlign="center">-</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  )
}

export default BenefitsTable
