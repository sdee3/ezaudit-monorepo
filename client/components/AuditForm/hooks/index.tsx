import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, UseFormSetValue, UseFormTrigger } from 'react-hook-form'

import fetchFromApi from '../../../utils/api'
import { useLoading } from '../../Loading'
import { ApiResponse, InputValues } from '../../../models'

const useInput = (
  setFormFieldValue: UseFormSetValue<InputValues>,
  onAlertClose: () => void,
  trigger: UseFormTrigger<InputValues>
) => {
  const [apiResponseOutput, setApiResponseOutput] =
    useState<ApiResponse | null>(null)
  const { isLoading, setIsLoading } = useLoading()

  useEffect(() => {
    trigger()
  }, [trigger])

  useEffect(() => {
    if (apiResponseOutput !== null) setApiResponseOutput(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAlertClose])

  const onSubmit: SubmitHandler<InputValues> = useCallback(
    async ({ domain }) => {
      try {
        setIsLoading(true)
        const valueFromResponse: ApiResponse = await fetchFromApi(
          '/api/audit',
          'POST',
          { domain }
        )

        setApiResponseOutput(valueFromResponse)
      } catch {
        setIsLoading(false)
      } finally {
        setIsLoading(false)
        setFormFieldValue('domain', '')
        trigger()
      }
    },
    [setFormFieldValue, setIsLoading, trigger]
  )

  return { isLoading, onSubmit, apiResponseOutput }
}

export { useInput }
