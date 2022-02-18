import { Container } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'

import {
  AuditResult,
  AuthContext,
  AuthWrapper,
  Breadcrumbs,
  Loading,
  NoResults,
} from '../../../components'
import { ResetPasswordForm } from '../../../components/Auth/components/ResetPasswordForm'
import {
  AuditResultCategories,
  AuditResultFromAPI,
  AuditResultParsed,
  BreadcrumbLink,
} from '../../../models'
import {
  ROUTES,
  SUCCESS_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
} from '../../../utils'
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
  const { user } = useContext(AuthContext)
  const [audit, setAudit] = useState<AuditResultParsed | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { push, query } = useRouter()
  const [fetchFromApi] = useApi()

  const fetchEmailDataFromUrl = useCallback(async () => {
    const potentialEmail = query?.e
    if (!potentialEmail) return

    const resultFromAPI = await fetchFromApi(`/api/user/${query.e}`, 'GET')

    if (resultFromAPI.status === SUCCESS_STATUS_CODE) {
      setEmail(resultFromAPI.email as string)
      push(ROUTES.audit(query.auditId as string))
    }
  }, [fetchFromApi, push, query?.auditId, query?.e])

  const fetchData = useCallback(async () => {
    if (!query?.auditId) return

    try {
      setLoading(true)

      const resultFromAPI = await fetchFromApi(
        `/api/audits/${query.auditId}`,
        'GET'
      )

      if (resultFromAPI.status === UNAUTHORIZED_STATUS_CODE) {
        throw new Error()
      }

      const auditParsed: AuditResultParsed = {
        ...(resultFromAPI.message as AuditResultFromAPI),
        audit_result: JSON.parse(
          (resultFromAPI.message as AuditResultFromAPI).audit_result
        ) as AuditResultCategories,
      }

      setAudit(auditParsed)
    } catch (error) {
      setAudit(null)
    } finally {
      setLoading(false)
    }
  }, [fetchFromApi, query.auditId])

  useEffect(() => {
    query?.e && fetchEmailDataFromUrl()
    !email && fetchData()
  }, [email, fetchData, fetchEmailDataFromUrl, query?.e])

  if (loading) return <Loading />
  if (!user && !email) return <AuthWrapper />
  if (!audit && !email) return <NoResults asError404 />

  return (
    <>
      <Head>
        <title>
          Your Audit {audit?.domain ? `of ${audit.domain}` : ''}| EZ Audit
        </title>
      </Head>
      {!email && <Breadcrumbs links={BREADCRUMB_LINKS} />}
      <Container maxW="container.xl">
        {email && <ResetPasswordForm email={email} />}
        {!email && <AuditResult audit={audit} />}
      </Container>
    </>
  )
}

export default AuditByIdOverview
