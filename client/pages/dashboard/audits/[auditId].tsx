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
import { ROUTES, UNAUTHORIZED_STATUS_CODE } from '../../../utils'
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
  const [loading, setLoading] = useState(false)
  const { push, replace, query } = useRouter()
  const { fetchFromApi, fetchEmailDataFromUrl, parsedEmail, clearParsedEmail } =
    useApi()

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
    !user && query?.e && fetchEmailDataFromUrl(query.e as string)
    !parsedEmail && fetchData()
    parsedEmail && push(ROUTES.audit(query.auditId as string))
  }, [
    fetchData,
    fetchEmailDataFromUrl,
    parsedEmail,
    push,
    query.auditId,
    query.e,
    user,
  ])

  useEffect(() => {
    if (user && parsedEmail) {
      clearParsedEmail()
    }
  }, [clearParsedEmail, parsedEmail, user])

  useEffect(() => {
    if (user && query?.e) {
      replace({
        pathname: ROUTES.audit(query.auditId as string),
        query: undefined,
      })
    }
  }, [replace, user, query?.e, query.auditId])

  if (loading) return <Loading />
  if (!user && !parsedEmail) return <AuthWrapper />
  if (!audit && !parsedEmail) return <NoResults asError404 />

  return (
    <>
      <Head>
        <title>
          Your Audit {audit?.domain ? `of ${audit.domain}` : ''}| EZ Audit
        </title>
      </Head>
      {!parsedEmail && <Breadcrumbs links={BREADCRUMB_LINKS} />}
      <Container maxW="container.xl">
        {parsedEmail && <ResetPasswordForm email={parsedEmail} />}
        {!parsedEmail && <AuditResult audit={audit} />}
      </Container>
    </>
  )
}

export default AuditByIdOverview
