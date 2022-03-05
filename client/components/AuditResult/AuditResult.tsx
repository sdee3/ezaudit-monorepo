import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useContext } from 'react'

import { AuditResultParsed } from '../../models'
import { PrintContext } from '../../modules/Print'

interface Props {
  audit: AuditResultParsed
}

export const AuditResult = ({ audit }: Props) => {
  const { isPrinting, setIsPrinting } = useContext(PrintContext)

  const handleOnPrintClick = async () => {
    await setIsPrinting(true)

    window.onafterprint = () => setIsPrinting(false)

    window.print()
  }

  return (
    <>
      <Flex
        mb={4}
        flexDirection={{ base: 'column', md: 'row' }}
        gap={4}
        justifyContent="space-between"
      >
        <Heading>
          Audit of{' '}
          <a href={audit.domain} target="_blank" rel="noopener noreferrer">
            {audit.domain}
          </a>
        </Heading>
        <Button
          onClick={handleOnPrintClick}
          display={isPrinting ? 'none' : 'block'}
          variant="outline"
          colorScheme="facebook"
          width="fit-content"
        >
          Export to PDF
        </Button>
      </Flex>
      <Text mb={4}>
        <strong>Date of audit:</strong>{' '}
        {new Date(audit.date_of_request).toString()}
      </Text>
      <Box my={8}>
        <Text>
          <strong>Accessibility: </strong>
          {Math.ceil(audit.audit_result.accessibility.score * 100)}
        </Text>
        <Text>
          <strong>Best Practices: </strong>
          {Math.ceil(audit.audit_result['best-practices'].score * 100)}
        </Text>
        <Text>
          <strong>Performance: </strong>
          {Math.ceil(audit.audit_result.performance.score * 100)}
        </Text>
        <Text>
          <strong>SEO: </strong>
          {Math.ceil(audit.audit_result.seo.score * 100)}
        </Text>
      </Box>
    </>
  )
}
