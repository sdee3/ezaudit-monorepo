import { createGlobalStyle } from 'styled-components'

const theme = {
  colors: {
    primary: '#333',
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

export default theme
export { GlobalStyle }
