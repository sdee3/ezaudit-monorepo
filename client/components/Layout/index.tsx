import { Fragment } from 'react'

import Navbar from '../Navbar'
import Footer from '../Footer'

export default function Layout({ children }) {
  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}
