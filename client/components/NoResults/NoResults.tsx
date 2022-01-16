import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

const NoResults = () => {
  return (
    <>
      <Flex justifyContent="center">
        <Box width={{ sm: '80vw', md: 'container.sm' }}>
          <Image
            alt="EZ Audit No Results Found"
            src="/img/EZAudit-Empty-State.svg"
            width="800"
            height="600"
          />
        </Box>
      </Flex>
      <Text mt="8" mb="8" textAlign="center" fontWeight="bold">
        No results found.
      </Text>
    </>
  )
}

export default NoResults
