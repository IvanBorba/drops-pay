import * as React from 'react'

import { Box, Grid, GridItem } from '@chakra-ui/react'

import { ColorModeSwitcher } from './ColorModeSwitcher'
import SideBar from './components/SideBar'
import AppRoutes from './pages'

export const App = () => (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" pr={10} templateColumns={'minmax(20vw, 23.75rem) auto'}>
      <GridItem
        rowSpan={1}
        colSpan={1}
        borderRight="0.5px solid rgba(0,0,0,0.1)"
        minWidth="320px"
      >
        <SideBar />
      </GridItem>
      <Grid rowSpan={1} colSpan={1} templateRows={'minmax(5vh, 48px) auto'}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <AppRoutes />
      </Grid>
    </Grid>
  </Box>
)
