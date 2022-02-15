import { AppProps } from 'next/dist/shared/lib/router/router'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'

import { theme } from '../utils'
import { Layout, useAuthContext } from '../components'

const App = ({ Component, pageProps }: AppProps) => {
  const { AuthContext, accessToken, setUserData, clearUser, user } =
    useAuthContext()

  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <AuthContext.Provider
          value={{ user, accessToken, setUserData, clearUser }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContext.Provider>
      </CookiesProvider>
    </ChakraProvider>
  )
}

export default App
