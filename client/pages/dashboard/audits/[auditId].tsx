import { Container, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { Breadcrumbs, Loading, NoResults } from '../../../components'
import {
  AuditResult,
  AuditResultFromAPI,
  AuditResultParsed,
  BreadcrumbLink,
} from '../../../models'
import { ROUTES } from '../../../utils'
import { useApi } from '../../../utils'

const BREADCRUMB_LINKS: BreadcrumbLink[] = [
  {
    route: ROUTES.dashboard,
    name: 'Dashboard',
  },
  {
    route: ROUTES.userAudits,
    name: 'Audits',
  },
]

const AuditByIdOverview = () => {
  const [audit, setAudit] = useState<AuditResultParsed | null>(null)
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()
  const { fetchFromApi } = useApi()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      const resultFromAPI = (
        await fetchFromApi(`/api/audits/${query.auditId}`, 'GET')
      ).message

      const auditParsed: AuditResultParsed = {
        ...(resultFromAPI as AuditResultFromAPI),
        audit_result: JSON.parse(
          (resultFromAPI as AuditResultFromAPI).audit_result
        ) as AuditResult,
      }

      setAudit(auditParsed)
    } catch (error) {
      setAudit(null)
    } finally {
      setLoading(false)
    }
  }, [fetchFromApi, query.auditId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) return <Loading />
  if (!audit) return <NoResults asError404 />

  return (
    <>
      <Breadcrumbs links={BREADCRUMB_LINKS} />
      <Container maxW="container.xl">
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
          Accessibility:{' '}
          {Math.ceil(audit.audit_result.accessibility.score * 100)}
        </Text>
        <Text>
          Best Practices:{' '}
          {Math.ceil(audit.audit_result['best-practices'].score * 100)}
        </Text>
        <Text>
          Performance: {Math.ceil(audit.audit_result.performance.score * 100)}
        </Text>
        <Text>SEO: {Math.ceil(audit.audit_result.seo.score * 100)}</Text>
      </Container>
    </>
  )
}

export default AuditByIdOverview
