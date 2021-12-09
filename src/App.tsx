import * as React from 'react'

import { ChakraProvider, Box, Grid, theme, GridItem } from '@chakra-ui/react'

import { ColorModeSwitcher } from './ColorModeSwitcher'
import AppRoutes from './pages'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" pr={10} templateColumns={'minmax(10vw, 250px) auto '}>
        <GridItem rowSpan={1} colSpan={1} bg="tomato"></GridItem>
        <Grid rowSpan={1} colSpan={1} templateRows={'minmax(5vh, 48px) auto'}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <AppRoutes />
        </Grid>
      </Grid>
    </Box>
  </ChakraProvider>
)
