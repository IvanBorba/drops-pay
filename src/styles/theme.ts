import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    green: {
      500: '#12B886',
      400: '#88DBC2',
      300: '#C3ECE0',
      200: '#E0F5EF',
    },
    grey: {
      500: '#212529',
      400: '#868E96',
      300: '#E9ECEF',
      200: '#F8F9FA',
    },
    service1: {
      100: '#0AB2BF',
      50: '#E7F8F9',
    },
    service2: {
      100: '#E8D55D',
      50: '#FDFBEF',
    },
    service3: {
      100: '#12B886',
      50: '#E0F5EF',
    },
    service4: {
      100: '#FE7E7E',
      50: '#FFF3F3',
    },
    service5: {
      100: '#7B61FF',
      50: '#F2F0FF',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    fontSizes: {
      xs: '0.625rem',
      sm: '0.75rem',
      md: '0.875rem',
      lg: '1rem',
      xl: '1.25rem',
      '2xl': '1,5rem',
      '3xl': '1.75rem',
    },
  },
})
