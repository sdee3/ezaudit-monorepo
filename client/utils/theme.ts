import { createGlobalStyle } from 'styled-components'

const theme = {
  colors: {
    primary: '#333',
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, Cantarell, sans-serif;
  }
`

export default theme
export { GlobalStyle }
