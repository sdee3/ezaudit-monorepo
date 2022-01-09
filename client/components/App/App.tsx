import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
} from '@chakra-ui/react'
import Typewriter, { TypewriterClass } from 'typewriter-effect'

import AuditForm from '../AuditForm'

const App = () => {
  const onTypewriterInit = (typewriter: TypewriterClass) => {
    typewriter
      .typeString('greatest')
      .pauseFor(3000)
      .deleteAll()
      .typeString('smartest')
      .pauseFor(3000)
      .deleteAll()
      .typeString('simplest')
      .pauseFor(3000)
      .deleteAll()
      .start()
  }

  return (
    <Center>
      <Container maxW="container.xl">
        <Grid
          gridTemplateColumns={{ sm: '1fr', md: '1fr auto' }}
          gridTemplateRows={{ sm: 'auto auto', md: '1fr' }}
        >
          <Flex
            direction="column"
            justifyContent={{ sm: 'flex-start', md: 'center' }}
            gap="10"
          >
            <Heading mb={{ sm: '5', md: '20' }}>
              {'The '}
              <Box display="inline-block" mx="2">
                <Typewriter
                  onInit={onTypewriterInit}
                  options={{ loop: true }}
                />
              </Box>
              {'audit tool for your business.'}
            </Heading>

            <AuditForm />
          </Flex>
          <Flex justifyContent="center">
            <Image
              alt="EZ Audit Hero Cover"
              maxW={{ sm: '80vw', md: 'container.sm' }}
              src="/img/EZAudit-Home-Futuristic.svg"
            />
          </Flex>
        </Grid>
      </Container>
    </Center>
  )
}

export default App
