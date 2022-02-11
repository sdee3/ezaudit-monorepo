import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'

interface Props {
  asError404?: boolean
}

const NoResults = ({ asError404 = false }: Props) => {
  return (
    <>
      <Heading textAlign="center">
        {asError404 ? 'Not Found' : 'No Results'}
      </Heading>
      {!asError404 && (
        <Text mt="8" mb="8" textAlign="center" fontWeight="bold">
          No results found.
        </Text>
      )}
      <Flex justifyContent="center">
        <Box width={{ sm: '80vw', md: 'container.sm' }}>
          <Image
            alt="EZ Audit No Results Found"
            src={
              asError404
                ? '/img/EZAudit-Not-Found.svg'
                : '/img/EZAudit-Empty-State.svg'
            }
            width="800"
            height="600"
          />
        </Box>
      </Flex>
    </>
  )
}

export default NoResults
