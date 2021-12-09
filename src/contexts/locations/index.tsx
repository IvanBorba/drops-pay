import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { apiWS } from '../../services'

interface City {
  id: number
  nome: string
  uf: string
  IBGE: number
}

interface State {
  id: number
  nome: string
  uf: string
  paisid: number
  paisnome: string
}

interface Country {
  id: number
  nome: string
  sigla: string
}

interface LocationsProviderProps {
  children: ReactNode
}

interface LocationsProviderData {
  cities: City[]
  states: State[]
  countries: Country[]
}

const LocationsContext = createContext<LocationsProviderData>(
  {} as LocationsProviderData
)

export const LocationsProvider = ({ children }: LocationsProviderProps) => {
  const [cities, setCities] = useState<City[]>([])
  const [states, setStates] = useState<State[]>([])
  const [countries, setCountries] = useState<Country[]>([])

  const getLocations = () => {
    const data = [{ updatekind: 997, razaosocial: '' }]

    apiWS.post<City[]>('/WSCidades', data).then((res) => {
      setCities(res.data)
    })

    apiWS.post<State[]>('/WSEstados', data).then((res) => {
      setStates(res.data)
    })

    apiWS.post<Country[]>('/WSPaises', data).then((res) => {
      setCountries(res.data)
    })
  }

  useEffect(() => {
    if (cities.length === 0) getLocations()
  }, [cities.length])

  return (
    <LocationsContext.Provider value={{ cities, states, countries }}>
      {children}
    </LocationsContext.Provider>
  )
}

export const useHoldings = () => useContext(LocationsContext)
