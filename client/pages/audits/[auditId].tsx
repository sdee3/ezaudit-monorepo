import { Container, Heading, Text } from '@chakra-ui/react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import {
  AuditResult,
  AuditResultFromAPI,
  AuditResultParsed,
} from '../../models'
import fetchFromApi from '../../utils/api'

interface PageProps {
  audit: AuditResultParsed
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const resultFromAPI = (
    await fetchFromApi(`/api/audits/${context.query.auditId}`, 'GET')
  ).message

  const auditParsed: AuditResultParsed = {
    ...(resultFromAPI as AuditResultFromAPI),
    audit_result: JSON.parse(
      (resultFromAPI as AuditResultFromAPI).audit_result
    ) as AuditResult,
  }

  return {
    props: {
      audit: auditParsed,
    },
  }
}

const AuditByIdOverview = ({ audit }: PageProps) => {
  return (
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
      <Text>Accessibility: {audit.audit_result.accessibility.score * 100}</Text>
      <Text>
        Best Practices: {audit.audit_result['best-practices'].score * 100}
      </Text>
      <Text>Performance: {audit.audit_result.performance.score * 100}</Text>
      <Text>SEO: {audit.audit_result.seo.score * 100}</Text>
    </Container>
  )
}

export default AuditByIdOverview
