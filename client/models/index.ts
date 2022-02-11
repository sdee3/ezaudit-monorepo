export interface ApiResponse extends Record<string, unknown> {
  message?: string | object | object[]
  status?: number
  error?: string
}

export * from './Alert'
export * from './Audit'
export * from './BreadcrumbLink'
export * from './Form'
