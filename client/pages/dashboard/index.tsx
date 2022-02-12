import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useCookies } from 'react-cookie'

import { AuthWrapper, useUser } from '../../components'
import { ROUTES, SUCCESS_STATUS_CODE, useApi } from '../../utils'

const DashboardPage = () => {
  const { push } = useRouter()
  const [fetchFromApi] = useApi()
  const { user } = useUser()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, _setCookie, removeCookie] = useCookies()

  const logout = useCallback(async () => {
    const res = await fetchFromApi('/api/auth/logout', 'POST')

    if (res.status === SUCCESS_STATUS_CODE) {
      removeCookie('accessToken')
      removeCookie('user')
    }
  }, [fetchFromApi, removeCookie])

  if (!user) return <AuthWrapper />

  return (
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
          <Button data-cy="signOutBtn" onClick={logout}>
            Sign Out
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default DashboardPage
