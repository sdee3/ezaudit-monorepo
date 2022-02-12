import { Heading, Text } from '@chakra-ui/react'

import { AuditResultParsed } from '../../models'

interface Props {
  audit: AuditResultParsed
}

export const AuditResult = ({ audit }: Props) => {
  return (
    <>
      <Heading mb={4}>
        Audit of{' '}
        <a href={audit.domain} target="_blank" rel="noopener noreferrer">
          {audit.domain}
        </a>
      </Heading>
      <Text mb={4}>
        <strong>Date of audit:</strong>{' '}
        {new Date(audit.date_of_request).toString()}
      </Text>
      <Text>
        Accessibility: {Math.ceil(audit.audit_result.accessibility.score * 100)}
      </Text>
      <Text>
        Best Practices:{' '}
        {Math.ceil(audit.audit_result['best-practices'].score * 100)}
      </Text>
      <Text>
        Performance: {Math.ceil(audit.audit_result.performance.score * 100)}
      </Text>
      <Text>SEO: {Math.ceil(audit.audit_result.seo.score * 100)}</Text>
    </>
  )
}
