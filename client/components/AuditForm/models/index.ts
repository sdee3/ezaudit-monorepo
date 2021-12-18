import { FieldError } from 'react-hook-form/dist/types'

export type InputValues = {
  domain: string
}

export type Errors = {
  domain?: FieldError
}

export type ApiResponse = {
  output: string
}

export interface AlertData {
  message: string
  state: 'success' | 'warning' | 'error' | null
}
