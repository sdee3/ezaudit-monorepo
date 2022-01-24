import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { ROUTES } from '../../utils'

const DashboardPage = () => {
  const { push } = useRouter()

  return (
    <Container maxW="container.xl">
      <Heading mb="8">Dashboard</Heading>
      <hr />
      <Box minHeight="50vh">
        <Text fontSize="3xl" fontWeight="bold" mb="4" mt="8">
          Audits
        </Text>
        <Button data-cy="viewAuditsBtn" onClick={() => push(ROUTES.userAudits)}>
          View Your Audits
        </Button>
      </Box>
    </Container>
  )
}

export default DashboardPage
