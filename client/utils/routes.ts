export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  userAudits: '/dashboard/audits',
  audit: (auditId: string) => `/dashboard/audits/${auditId}`,
  passwordReset: '/dashboard/password-reset',
}
