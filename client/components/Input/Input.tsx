import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import fetchFromApi from '../../utils/api'
import { WEBSITE_REGEX_PATTERN } from '../../utils/constants'
import Loading, { useLoading } from '../Loading'

type InputValues = {
  domain: string
}

export default function Input() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValues>()
  const [value, setValue] = useState(null)
  const { isLoading, setIsLoading } = useLoading()

  useEffect(() => {
    if (!value || !errors?.domain) return
    if (value && errors.domain) setValue(null)
  }, [errors?.domain, value])

  const onSubmit: SubmitHandler<InputValues> = async ({ domain }) => {
    try {
      setIsLoading(true)
      const valueFromResponse = await fetchFromApi('/api/audit', 'POST', { domain })
      setValue(valueFromResponse)
    } catch {
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Loading enabled={isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('domain', {
            required: true,
            pattern: WEBSITE_REGEX_PATTERN,
          })}
        />
        <input type="submit" />
      </form>
      {errors.domain && <span>Not a valid website!</span>}
      {value !== null && JSON.stringify(value)}
    </>
  )
}
