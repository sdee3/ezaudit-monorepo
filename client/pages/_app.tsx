import { AppProps } from 'next/dist/shared/lib/router/router'
import React, { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../utils'
import { Layout } from '../components'

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default App
