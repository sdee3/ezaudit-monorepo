import {
  Input as InputField,
  Button,
  FormControl,
  FormLabel,
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
    trigger,
  } = useForm<InputValues>({ mode: 'onChange', defaultValues: { domain: '' } })
  const { alertMessage, onAlertClose, setAlertMessage } = useAlert()

  const { isLoading, onSubmit, apiResponseOutput } = useInput(
    setValue,
    onAlertClose,
    trigger
  )

  useEffect(() => {
    if (apiResponseOutput?.message?.length > 0) {
      setAlertMessage({
        message: apiResponseOutput.message,
        state: apiResponseOutput.status === 202 ? 'success' : 'error',
      })

      return
    }
  }, [apiResponseOutput, setAlertMessage])

  const { message, state } = alertMessage

  return (
    <>
      <form onSubmit={() => handleSubmit(onSubmit)}>
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
              disabled={!!errors?.domain}
              onClick={handleSubmit(onSubmit)}
            >
              Audit
            </Button>
          </Flex>
        </FormControl>
      </form>

      {alertMessage?.message?.length > 0 && (
        <Alert
          marginTop={6}
          alertMessage={message}
          onCloseCallback={onAlertClose}
          status={state}
        />
      )}
    </>
  )
}

export default AuditForm
