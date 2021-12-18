import { useCallback, useState } from 'react'
import {
  SubmitHandler,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'

import fetchFromApi from '../../../utils/api'
import { useLoading } from '../../Loading'
import { ApiResponse, InputValues } from '../models'

const useInput = (
  setFormFieldValue: UseFormSetValue<InputValues>,
  setError: UseFormSetError<InputValues>
) => {
  const [apiResponseOutput, setApiResponseOutput] = useState<string | null>(
    null
  )
  const { isLoading, setIsLoading } = useLoading()

  // useEffect(() => {
  //   if (!apiResponseOutput || !errors?.domain) return
  //   if (apiResponseOutput && errors.domain) setApiResponseOutput(null)
  // }, [errors?.domain, apiResponseOutput])

  const onSubmit: SubmitHandler<InputValues> = useCallback(
    async ({ domain }) => {
      try {
        setIsLoading(true)
        const valueFromResponse: ApiResponse = await fetchFromApi(
          '/api/audit',
          'POST',
          { domain }
        )
        setApiResponseOutput(valueFromResponse.output)
      } catch {
        setIsLoading(false)
      } finally {
        setIsLoading(false)
        setError('domain', null)
        setFormFieldValue('domain', '')
      }
    },
    [setError, setFormFieldValue, setIsLoading]
  )

  return { isLoading, onSubmit, apiResponseOutput }
}

export { useInput }
