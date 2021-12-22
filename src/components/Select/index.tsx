import { Select as ChakraSelect } from '@chakra-ui/react'

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

interface IProps {
  data: PointOfSale[]
  onChange: (event: string) => void
}

const Select = ({ data, onChange }: IProps) => {
  return (
    <ChakraSelect
      placeholder="Selecione o Ponto de Vendas"
      onChange={(e) => onChange(e.target.value)}
      width="30rem"
    >
      {data.map((item, index) => (
        <option key={index} value={item.id}>
          {item.razaosocial}
        </option>
      ))}
    </ChakraSelect>
  )
}

export default Select
