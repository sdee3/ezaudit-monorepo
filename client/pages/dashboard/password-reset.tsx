import { Container, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { Fragment, useEffect } from 'react'

import { ResetPasswordForm } from '../../components/Auth/components'
import { useApi } from '../../utils'

const PasswordResetPage: NextPage = () => {
  const { query } = useRouter()
  const { fetchEmailDataFromUrl, parsedEmail } = useApi()

  useEffect(() => {
    if (!query?.e) return

    fetchEmailDataFromUrl(query.e as string, true)
  }, [fetchEmailDataFromUrl, parsedEmail, query.e])

  return (
    <Fragment>
      <Head>
        <title>Password Reset | EZ Audit</title>
      </Head>
      <Container maxW="container.xl">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <ResetPasswordForm email={parsedEmail} />
        </Stack>
      </Container>
    </Fragment>
  )
}

export default PasswordResetPage
