import { Center, Container, Heading } from '@chakra-ui/react'

import AuditForm from '../AuditForm'

const App = () => (
  <Center>
    <Container>
      <Heading mb={10} textAlign="center">
        EZ Audit
      </Heading>
      <AuditForm />
    </Container>
  </Center>
)

export default App
