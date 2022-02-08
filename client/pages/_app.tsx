import { AppProps } from 'next/dist/shared/lib/router/router'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../utils'
import { Layout } from '../components'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default App
