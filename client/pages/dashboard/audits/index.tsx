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
import { useCookies } from 'react-cookie'

import {
  AuditResultFromAPI,
  AuditResultParsed,
  BreadcrumbLink,
} from '../../../models'
import { AuditResultCategories } from '../../../models/Audit'
import { ROUTES, UNAUTHORIZED_STATUS_CODE } from '../../../utils'
import {
  Breadcrumbs,
  Loading,
  NoResults,
  AuthWrapper,
  useUser,
} from '../../../components'
import { useApi } from '../../../utils'

const BREADCRUMB_LINKS: BreadcrumbLink[] = [
  {
    route: ROUTES.dashboard,
    name: 'Dashboard',
  },
]

const AuditsIndex = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, _setCookie, _removeCookie] = useCookies()
  const [audits, setAudits] = useState<AuditResultParsed[] | null>(null)
  const { fetchFromApi } = useApi()
  const { user } = useUser()

  const [isLoading, setIsLoading] = useState(false)

  const parseAudits = useCallback(async () => {
    try {
      setIsLoading(true)
      const { status, message } = await fetchFromApi('/api/audits', 'GET', null)

      if (status === UNAUTHORIZED_STATUS_CODE) return

      const auditsParsed: AuditResultParsed[] = (
        message as AuditResultFromAPI[]
      ).map(r => ({
        ...r,
        audit_result: JSON.parse(r.audit_result) as AuditResultCategories,
      }))

      setAudits(auditsParsed)
    } catch (err) {
      if (audits?.length !== 0) setAudits([])
    } finally {
      setIsLoading(false)
    }
  }, [audits, fetchFromApi])

  useEffect(() => {
    if (audits !== null) return
    !user && parseAudits()
  }, [audits, parseAudits, user])

  if (isLoading) return <Loading />
  if (!user) return <AuthWrapper />

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
                    <Td>
                      {Math.ceil(audit.audit_result.accessibility.score * 100)}
                    </Td>
                    <Td>
                      {Math.ceil(
                        audit.audit_result['best-practices'].score * 100
                      )}
                    </Td>
                    <Td>
                      {Math.ceil(audit.audit_result.performance.score * 100)}
                    </Td>
                    <Td>{Math.ceil(audit.audit_result.seo.score * 100)}</Td>
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
