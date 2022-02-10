import {
  Box,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import {
  AuditResultFromAPI,
  AuditResultParsed,
  BreadcrumbLink,
} from '../../../models'
import { AuditResult } from '../../../models/Audit'
import {
  fetchFromApi,
  ROUTES,
  SUCCESS_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
} from '../../../utils'
import { Breadcrumbs, NoResults, SignIn } from '../../../components'

const BREADCRUMB_LINKS: BreadcrumbLink[] = [
  {
    route: ROUTES.dashboard,
    name: 'Dashboard',
  },
]

const AuditsIndex = () => {
  const [audits, setAudits] = useState<AuditResultParsed[]>([])
  const [isUnauthorized, setIsUnauthorized] = useState(false)

  const parseAudits = useCallback(async () => {
    const { status, message } = await fetchFromApi('/api/audits', 'GET')

    if (status === UNAUTHORIZED_STATUS_CODE) {
      setIsUnauthorized(true)
      return
    }

    const auditsParsed: AuditResultParsed[] = (
      message as AuditResultFromAPI[]
    ).map(r => ({
      ...r,
      audit_result: JSON.parse(r.audit_result) as AuditResult,
    }))

    setAudits(auditsParsed)
  }, [])

  const login = useCallback(async () => {
    const res = await fetchFromApi('/api/auth/login', 'POST', {
      email: 'stefd996@gmail.com',
      password: '',
    })

    if (res.status === SUCCESS_STATUS_CODE) setIsUnauthorized(false)
  }, [])

  useEffect(() => {
    parseAudits()
    login()
  }, [parseAudits, login])

  if (isUnauthorized) {
    return (
      <Container maxW="container.xl">
        <SignIn />
      </Container>
    )
  }

  if (!audits || audits.length === 0) {
    return (
      <Container maxW="container.xl">
        <Heading textAlign="center" mb="8">
          Your Audits
        </Heading>
        <NoResults />
      </Container>
    )
  }

  return (
    <>
      <Breadcrumbs links={BREADCRUMB_LINKS} />
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
                <Link key={audit.id} href={ROUTES.audit(audit.id)} passHref>
                  <Tr data-cy={`auditTableRow${audit.id}`} cursor="pointer">
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
                </Link>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </>
  )
}

export default AuditsIndex
