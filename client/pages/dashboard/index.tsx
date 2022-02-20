import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useContext } from 'react'

import { AuthContext, AuthWrapper } from '../../components'
import { ROUTES, SUCCESS_STATUS_CODE, useApi } from '../../utils'

const DashboardPage = () => {
  const { user, clearUser } = useContext(AuthContext)
  const { push, reload } = useRouter()
  const { fetchFromApi } = useApi()

  const logout = useCallback(async () => {
    const res = await fetchFromApi('/api/auth/logout', 'POST')

    if (res.status === SUCCESS_STATUS_CODE) {
      clearUser()
      reload()
    }
  }, [clearUser, fetchFromApi, reload])

  if (!user)
    return (
      <>
        <Head>
          <title>Your Dashboard | EZ Audit</title>
        </Head>
        <AuthWrapper />
      </>
    )

  return (
    <Fragment>
      <Head>
        <title>Your Dashboard | EZ Audit</title>
      </Head>
      <Container maxW="container.xl">
        <Heading mb="8">Dashboard</Heading>
        <hr />
        <Box minHeight="50vh">
          <Box mb={8}>
            <Text fontSize="3xl" fontWeight="bold" mb="4" mt="8">
              Your Data
            </Text>
            <Text>{JSON.stringify(user)}</Text>
          </Box>
          <hr />
          <Box mb={8}>
            <Text fontSize="3xl" fontWeight="bold" mb="4" mt="8">
              Audits
            </Text>
            <Button
              data-cy="viewAuditsBtn"
              onClick={() => push(ROUTES.userAudits)}
            >
              View Your Audits
            </Button>
          </Box>
          <hr />
          <Box mb={8}>
            <Text fontSize="3xl" fontWeight="bold" mb="4" mt="8">
              Account Settings
            </Text>
            <Button data-cy="signOutBtn" onClick={() => logout()}>
              Sign Out
            </Button>
          </Box>
        </Box>
      </Container>
    </Fragment>
  )
}

export default DashboardPage
