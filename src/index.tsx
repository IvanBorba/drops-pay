import * as React from 'react'
import ReactDOM from 'react-dom'

import { ColorModeScript } from '@chakra-ui/react'

import { App } from './App'
import Providers from './contexts'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)
