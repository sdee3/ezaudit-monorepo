import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'

interface Props {
  asError404?: boolean
}

export const NoResults = ({ asError404 = false }: Props) => {
  return (
    <>
      {asError404 && (
        <Heading data-cy="noResultsAs404" textAlign="center">
          Page Not Found
        </Heading>
      )}
      {!asError404 && (
        <Text
          data-cy="noResultAs200"
          mt="8"
          mb="8"
          textAlign="center"
          fontWeight="bold"
        >
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
