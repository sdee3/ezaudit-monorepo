import { Box, Container, Flex, Heading, Image, theme } from '@chakra-ui/react'
import { BiUserCircle } from 'react-icons/bi'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Navbar = () => {
  const { push } = useRouter()

  return (
    <nav>
      <Container py="4" mb="10" shadow="md" maxW="100vw">
        <Box mx="2">
          <Flex alignItems="center" justifyContent="space-between">
            <Link passHref href="/">
              <a>
                <Flex alignItems="center" gap="4">
                  <Image
                    boxSize="50px"
                    fallbackSrc="https://via.placeholder.com/50"
                    src="/manifest/icon-192x192.png"
                    alt="EZ Audit logo"
                  />
                  <Heading fontSize="2xl" textColor="gray.800">
                    EZ Audit
                  </Heading>
                </Flex>
              </a>
            </Link>
            <BiUserCircle
              cursor="pointer"
              color={theme.colors.gray[600]}
              onClick={() => push('/audits')}
              size="3rem"
              title="User dashboard"
            />
          </Flex>
        </Box>
      </Container>
    </nav>
  )
}

export default Navbar
