import * as React from 'react'

import { Box, Grid, GridItem } from '@chakra-ui/react'

import { ColorModeSwitcher } from './ColorModeSwitcher'
import SideBar from './components/SideBar'
import AppRoutes from './pages'

export const App = () => (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" pr={10} templateColumns={'minmax(18vw, 400px) auto '}>
      <GridItem rowSpan={1} colSpan={1} borderRight="0.5px solid black">
        <SideBar />
      </GridItem>
      <Grid rowSpan={1} colSpan={1} templateRows={'minmax(5vh, 48px) auto'}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <AppRoutes />
      </Grid>
    </Grid>
  </Box>
)
