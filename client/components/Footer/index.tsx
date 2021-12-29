import { Box, Flex, theme } from '@chakra-ui/react'

export default function Footer() {
  return (
    <footer>
      <Box mt="10" py="10" backgroundColor={theme.colors.blue[50]}>
        <Flex alignItems="center" justifyContent="center">
          Copyright &copy; EZ Audit. All rights reserved.
        </Flex>
      </Box>
    </footer>
  )
}
