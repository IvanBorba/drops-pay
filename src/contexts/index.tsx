import { ReactNode } from 'react'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'
import { CompaniesProvider } from './companies'
import { LocationsProvider } from './locations'
import { PointsOfSaleProvider } from './points-of-sale'

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ChakraProvider theme={theme}>
      <LocationsProvider>
        <CompaniesProvider>
          <PointsOfSaleProvider>{children}</PointsOfSaleProvider>
        </CompaniesProvider>
      </LocationsProvider>
    </ChakraProvider>
  )
}

export default Providers
