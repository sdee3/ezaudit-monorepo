import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme, { GlobalStyle } from '../utils/theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
