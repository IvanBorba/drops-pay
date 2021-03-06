import * as React from 'react'

import { Box, Grid, GridItem } from '@chakra-ui/react'

import SideBar from './components/SideBar'
import AppRoutes from './pages'

export const App = () => (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" pr={10} templateColumns={'minmax(320px, 23.75rem) auto'}>
      <GridItem rowSpan={1} colSpan={1} minWidth="320px">
        <SideBar />
      </GridItem>
      <Grid rowSpan={1} colSpan={1} templateRows={'minmax(5vh, 48px) auto'}>
        <AppRoutes />
      </Grid>
    </Grid>
  </Box>
)
