import { FieldError } from 'react-hook-form/dist/types'

export type InputValues = {
  domain: string
}

export type Errors = {
  domain?: FieldError
}

export type ApiResponse = {
  message: string | object | object[]
  status: number
}

export * from './Alert'
export * from './Audit'
export * from './BreadcrumbLink'
