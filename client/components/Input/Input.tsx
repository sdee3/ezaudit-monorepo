import { useForm, SubmitHandler } from 'react-hook-form'

import { WEBSITE_REGEX_PATTERN } from '../../utils/constants'

type InputValues = {
  domain: string
}

export default function Input() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValues>()
  const onSubmit: SubmitHandler<InputValues> = async ({ domain }) => {
    await fetch('/api/audit', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ domain }), // body data type must match "Content-Type" header
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('domain', {
          required: true,
          pattern: WEBSITE_REGEX_PATTERN,
        })}
      />
      {errors.domain && <span>Not a valid website!</span>}
      <input type="submit" />
    </form>
  )
}
