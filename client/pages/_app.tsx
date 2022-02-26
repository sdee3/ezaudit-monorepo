import { AppProps } from 'next/dist/shared/lib/router/router'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'
import CookieConsent from 'react-cookie-consent'
import Link from 'next/link'

import { ROUTES, theme } from '../utils'
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

          <CookieConsent
            style={{ backgroundColor: theme.colors.primaryDark }}
            buttonStyle={{
              backgroundColor: theme.colors.white,
              borderRadius: 4,
              color: theme.colors.primaryDark,
            }}
          >
            By continuing to use this site, you agree to our usage of cookies
            for enhancing the user experience. See{' '}
            <u>
              <Link href={ROUTES.termsAndConditions}>Terms and Conditions</Link>
            </u>{' '}
            for more information.
          </CookieConsent>
        </AuthContext.Provider>
      </CookiesProvider>
    </ChakraProvider>
  )
}

export default App
