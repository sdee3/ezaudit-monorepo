import { Box, Container, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { Fragment } from 'react'
import { AiOutlineCaretRight } from 'react-icons/ai'

import { BreadcrumbLink } from '../../models'
import { ROUTES } from '../../utils'

interface Props {
  links: BreadcrumbLink[]
}

const Breadcrumbs = ({ links }: Props) => {
  if (links.length === 0) return null

  return (
    <Box
      backgroundColor="blue.600"
      color="white"
      py="2"
      mb="8"
      mt="-10"
      shadow="md"
    >
      <Container maxW="container.xl">
        <Flex alignItems="center">
          <Box mr="2">
            <Link href={ROUTES.home}>Home</Link>
          </Box>
          {links.map(l => (
            <Fragment key={l.name}>
              <AiOutlineCaretRight />
              <Box ml="2" mr="2">
                <Link href={l.route}>{l.name}</Link>
              </Box>
            </Fragment>
          ))}
        </Flex>
      </Container>
    </Box>
  )
}

export default Breadcrumbs
