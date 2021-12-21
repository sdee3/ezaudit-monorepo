import { Box, Container, Flex, Heading, Img } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <nav>
      <Container py="4" mb="16" shadow="md" maxW="100vw">
        <Box mx="2">
          <Flex alignItems="center" gap="4">
            <Img
              boxSize="50px"
              fallbackSrc="https://via.placeholder.com/50"
              src="/manifest/icon-192x192.png"
              alt="EZ Audit logo"
            />
            <Heading fontSize="2xl" textColor="gray.800">
              EZ Audit
            </Heading>
          </Flex>
        </Box>
      </Container>
    </nav>
  )
}

export default Navbar
