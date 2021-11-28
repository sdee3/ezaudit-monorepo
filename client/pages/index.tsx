import Head from 'next/head'
import React, { Fragment } from 'react'

import App from '../components/App'

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>EZ Audit</title>
      </Head>
      <App />
    </Fragment>
  )
}

export default HomePage
