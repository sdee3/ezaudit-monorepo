import { FieldError } from 'react-hook-form/dist/types'

export type InputValues = {
  domain: string
  email: string
}

export type Errors = {
  domain?: FieldError
}

export interface ApiResponse extends Record<string, unknown> {
  message: string | object | object[]
  status: number
}

export * from './Alert'
export * from './Audit'
export * from './BreadcrumbLink'
