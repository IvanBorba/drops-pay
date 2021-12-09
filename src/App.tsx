import * as React from 'react'

import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react'

import { ColorModeSwitcher } from './ColorModeSwitcher'
import AppRoutes from './pages'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" paddingX={10}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <AppRoutes />
      </Grid>
    </Box>
  </ChakraProvider>
)
