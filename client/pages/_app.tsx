import { AppProps } from 'next/dist/shared/lib/router/router'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'

import { theme } from '../utils'
import { Layout } from '../components'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </ChakraProvider>
  )
}

export default App
