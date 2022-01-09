import { Box, Container, Flex, Heading, theme } from '@chakra-ui/react'
import { BiUserCircle } from 'react-icons/bi'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

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
                  <Box boxSize="50px">
                    <Image
                      src="/manifest/icon-192x192.png"
                      alt="EZ Audit logo"
                      width="100%"
                      height="100%"
                    />
                  </Box>
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
