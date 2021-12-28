import { FieldError } from 'react-hook-form/dist/types'

export type InputValues = {
  domain: string
}

export type Errors = {
  domain?: FieldError
}

export type ServerResponse = {
  message: string
}

export type ApiResponse = {
  message: string | object | object[]
  status: number
}

export interface AlertData {
  message: string
  state: 'success' | 'warning' | 'error' | null
}
