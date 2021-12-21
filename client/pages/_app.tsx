import { AppProps } from 'next/dist/shared/lib/router/router'
import React, { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../utils/theme'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        await navigator.serviceWorker.register('/sw.js')
      })
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
