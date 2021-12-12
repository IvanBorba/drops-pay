import { ReactNode } from 'react'

import { CompaniesProvider } from './companies'
import { LocationsProvider } from './locations'
import { PointsOfSaleProvider } from './points-of-sale'

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <LocationsProvider>
      <CompaniesProvider>
        <PointsOfSaleProvider>{children}</PointsOfSaleProvider>
      </CompaniesProvider>
    </LocationsProvider>
  )
}

export default Providers
