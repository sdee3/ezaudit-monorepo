import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'

import theme, { GlobalStyle } from '../utils/theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Normalize />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
