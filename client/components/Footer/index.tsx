import { Box, Flex } from '@chakra-ui/react'

export const Footer = () => {
  return (
    <footer>
      <Box mt="10" py="10">
        <Flex alignItems="center" justifyContent="center" color="gray.600">
          Copyright &copy; {new Date().getFullYear()}, EZ Audit. All rights
          reserved.
        </Flex>
      </Box>
    </footer>
  )
}
