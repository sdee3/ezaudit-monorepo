import React, { Fragment } from 'react'
import styled from 'styled-components'

import Input from '../Input'

const AppHeader = styled.h1`
  color: blue;
`

export default function App() {
  return (
    <Fragment>
      <AppHeader>EZ AUDIT!!!</AppHeader>
      <Input />
    </Fragment>
  )
}
