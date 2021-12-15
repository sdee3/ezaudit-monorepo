import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../utils/theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
