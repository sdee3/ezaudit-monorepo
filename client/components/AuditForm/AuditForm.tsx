import {
  Input as InputField,
  Button,
  FormControl,
  FormLabel,
  Container,
  Flex,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Alert from '../Alert'
import { WEBSITE_REGEX_PATTERN } from '../../utils/constants'
import useAlert from '../Alert/hooks'
import { useInput } from './hooks'
import { InputValues } from './models'

const AuditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<InputValues>()
  const { isLoading, onSubmit, apiResponseOutput } = useInput(
    setValue,
    setError
  )
  const { alertMessage, onAlertClose, setAlertMessage } = useAlert()

  useEffect(() => {
    if (apiResponseOutput === null || apiResponseOutput?.length === 0) return
    setAlertMessage({ message: apiResponseOutput, state: 'error' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponseOutput])

  useEffect(() => {
    if (!errors?.domain || alertMessage.state === 'error') return

    setError('domain', {
      message: 'The domain is not valid! Please enter a valid URL.',
    })

    const { message } = errors.domain

    setAlertMessage({ message, state: 'error' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors?.domain])

  const { message, state } = alertMessage

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="auditForm">
          <FormLabel>Your website to audit</FormLabel>
          <Flex gap={2}>
            <InputField
              data-cy="submitAuditInput"
              placeholder="Enter your domain here"
              variant="flushed"
              {...register('domain', {
                required: true,
                pattern: WEBSITE_REGEX_PATTERN,
              })}
            />
            <Button
              data-cy="submitAuditBtn"
              isLoading={isLoading}
              type="submit"
              variant="outline"
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
            >
              Audit
            </Button>
          </Flex>
        </FormControl>
      </form>

      {alertMessage.message.length > 0 && (
        <Alert
          marginTop={6}
          alertMessage={message}
          onCloseCallback={onAlertClose}
          status={state}
        />
      )}
    </Container>
  )
}

export default AuditForm
