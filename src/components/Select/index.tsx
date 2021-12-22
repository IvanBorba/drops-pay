import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react'

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

interface IProps extends SelectProps {
  data: PointOfSale[]
  handleChange: (event: string) => void
}

const Select = ({ data, handleChange, width = '30rem', ...rest }: IProps) => {
  return (
    <ChakraSelect
      placeholder="Selecione o Ponto de Vendas"
      onChange={(e) => handleChange(e.target.value)}
      width={width}
      {...rest}
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
