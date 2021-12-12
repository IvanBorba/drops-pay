import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { apiWS } from '../../services'

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

interface CompaniesProviderProps {
  children: ReactNode
}

interface CompaniesProviderData {
  companies: Company[]
}

const CompaniesContext = createContext<CompaniesProviderData>(
  {} as CompaniesProviderData
)

export const CompaniesProvider = ({ children }: CompaniesProviderProps) => {
  const [companies, setCompanies] = useState<Company[]>([])

  const getCompanies = () => {
    const data = [{ updatekind: 996, razaosocial: '' }]

    apiWS.post<Company[]>('/WSEmpresaControladora', data).then((res) => {
      setCompanies(res.data)
    })
  }

  useEffect(() => {
    if (companies.length === 0) getCompanies()
  }, [companies.length])

  return (
    <CompaniesContext.Provider value={{ companies }}>
      {children}
    </CompaniesContext.Provider>
  )
}

export const useHoldings = () => useContext(CompaniesContext)
