import {
  Box,
  Container,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

import { AuditResultFromAPI, AuditResultParsed } from '../../models'
import { AuditResult } from '../../models/Audit'
import fetchFromApi from '../../utils/api'

const AuditsIndex = () => {
  const [audits, setAudits] = useState<AuditResultParsed[]>([])

  const parseAudits = useCallback(async () => {
    const resultFromAPI = (await fetchFromApi('/api/audits', 'GET')).message

    const auditsParsed: AuditResultParsed[] = (
      resultFromAPI as AuditResultFromAPI[]
    ).map(r => ({
      ...r,
      audit_result: JSON.parse(r.audit_result) as AuditResult,
    }))

    setAudits(auditsParsed)
  }, [])

  useEffect(() => {
    parseAudits()
  }, [parseAudits])

  if (!audits?.length) return <Spinner />

  return (
    <Container maxW="container.xl">
      <Heading textAlign="center" mb="8">
        Your Audits
      </Heading>
      <Text mb="4">Disclaimer: All scores are on a scale of 0 to 100.</Text>
      <Box overflowX="scroll">
        <Table data-cy="auditsTable" variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Domain</Th>
              <Th>Accessibility</Th>
              <Th>Best practices</Th>
              <Th>Performance</Th>
              <Th>SEO</Th>
            </Tr>
          </Thead>
          <Tbody>
            {audits.map(audit => (
              <Tr key={audit.id}>
                <Td>
                  <a
                    href={audit.domain}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {audit.domain}
                  </a>
                </Td>
                <Td>{audit.audit_result.accessibility.score * 100}</Td>
                <Td>{audit.audit_result['best-practices'].score * 100}</Td>
                <Td>{audit.audit_result.performance.score * 100}</Td>
                <Td>{audit.audit_result.seo.score * 100}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  )
}

export default AuditsIndex
