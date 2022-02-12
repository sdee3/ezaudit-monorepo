import { Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import {
  AuditResult,
  Breadcrumbs,
  Loading,
  NoResults,
  useUser,
} from '../../../components'
import { ResetPasswordForm } from '../../../components/Auth/ResetPasswordForm'
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
  const [audit, setAudit] = useState<AuditResultParsed | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { push, query } = useRouter()
  const [fetchFromApi] = useApi()
  const { user, clearUser } = useUser()

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
    if (!query?.auditId || user === null) return

    try {
      setLoading(true)

      const resultFromAPI = await fetchFromApi(
        `/api/audits/${query.auditId}`,
        'GET'
      )

      if (resultFromAPI.status === UNAUTHORIZED_STATUS_CODE) {
        if (user !== null) clearUser()
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
  }, [clearUser, fetchFromApi, query?.auditId, user])

  useEffect(() => {
    query?.e && fetchEmailDataFromUrl()
    !email && user && fetchData()
  }, [email, fetchData, fetchEmailDataFromUrl, query?.e, user])

  if (loading) return <Loading />
  if (!audit && !email) return <NoResults asError404 />

  return (
    <>
      {!email && <Breadcrumbs links={BREADCRUMB_LINKS} />}
      <Container maxW="container.xl">
        {email && <ResetPasswordForm email={email} />}
        {!email && <AuditResult audit={audit} />}
      </Container>
    </>
  )
}

export default AuditByIdOverview
