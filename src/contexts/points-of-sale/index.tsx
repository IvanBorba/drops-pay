import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { apiWS } from '../../services'

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

interface PointsOfSaleProviderProps {
  children: ReactNode
}

interface PointsOfSaleProviderData {
  pointsOfSale: PointOfSale[]
}

const PointsOfSaleContext = createContext<PointsOfSaleProviderData>(
  {} as PointsOfSaleProviderData
)

export const PointsOfSaleProvider = ({
  children,
}: PointsOfSaleProviderProps) => {
  const [pointsOfSale, setPointsOfSale] = useState<PointOfSale[]>([])

  const getPointsOfSale = () => {
    const data = [{ updatekind: 996, razaosocial: '' }]

    apiWS.post<PointOfSale[]>('/WSPontoVenda', data).then((res) => {
      setPointsOfSale(res.data)
    })
  }

  useEffect(() => {
    if (pointsOfSale.length === 0) getPointsOfSale()
  }, [pointsOfSale.length])

  return (
    <PointsOfSaleContext.Provider value={{ pointsOfSale }}>
      {children}
    </PointsOfSaleContext.Provider>
  )
}

export const usePointsOfSale = () => useContext(PointsOfSaleContext)
