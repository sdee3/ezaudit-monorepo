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
  } = useForm<InputValues>()
  const { isLoading, onSubmit, apiResponseOutput } = useInput(setValue, errors)
  const { alertMessage, onAlertClose, setAlertMessage } = useAlert()

  useEffect(() => {
    if (apiResponseOutput?.length === 0) return
    setAlertMessage(apiResponseOutput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponseOutput])

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

      {alertMessage?.length > 0 && (
        <Alert
          marginTop={6}
          alertMessage={alertMessage}
          onCloseCallback={onAlertClose}
          status="success"
        />
      )}
    </Container>
  )
}

export default AuditForm
