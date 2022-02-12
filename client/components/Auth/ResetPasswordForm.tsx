import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import Alert from '../Alert'
import { ResetPasswordInputValues } from '../../models'
import { UNAUTHORIZED_STATUS_CODE, useApi } from '../../utils'
import useAlert from '../Alert/hooks'

interface Props {
  email: string
}

export const ResetPasswordForm = ({ email }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
  } = useForm<ResetPasswordInputValues>({
    mode: 'onChange',
    defaultValues: { password: '', password_confirmation: '' },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie, _removeCookie] = useCookies()
  const { fetchFromApi } = useApi()
  const { reload } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { alertMessage, setAlertMessage, onAlertClose } = useAlert()

  const passwordWatchers = watch(['password', 'password_confirmation'])

  const isSubmitDisabled = useMemo(
    () => !!errors?.password || !!errors?.password_confirmation || !isValid,
    [errors?.password, errors?.password_confirmation, isValid]
  )

  useEffect(() => {
    if (!email) return

    setAlertMessage({
      message:
        'You have successfully changed your password. Proceed to sign in.',
      state: 'success',
    })
  }, [email, setAlertMessage])

  const onSubmit: SubmitHandler<ResetPasswordInputValues> = useCallback(
    async ({ password }) => {
      try {
        setIsLoading(true)
        alertMessage.message.length && onAlertClose()

        const response = await fetchFromApi(
          '/api/auth/change-password',
          'POST',
          {
            email,
            password,
          }
        )

        if (response.status === UNAUTHORIZED_STATUS_CODE) {
          setAlertMessage({
            message: 'The data you entered is incorrect. Please try again.',
            state: 'error',
          })

          return
        }

        setCookie('accessToken', response.access_token)
        setCookie('user', JSON.stringify(response.user))
        reload()
      } catch (error) {
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    },
    [
      alertMessage.message.length,
      email,
      fetchFromApi,
      onAlertClose,
      reload,
      setAlertMessage,
      setCookie,
    ]
  )

  const { message, state } = alertMessage

  return (
    <Flex align="center" justify="center" flexDirection="column">
      {message?.length > 0 && (
        <Alert
          alertMessage={message}
          onCloseCallback={onAlertClose}
          status={state}
          mx="auto"
          maxW="lg"
        />
      )}
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center" mb={6}>
          <Heading fontSize="4xl" mb={6}>
            Set your password
          </Heading>
          <Text>Hello, {email}!</Text>
          <Text>Before viewing your audit, please set your password.</Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <form onSubmit={() => handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  data-cy="registerPasswordInput"
                  type="password"
                  {...register('password', {
                    required: true,
                  })}
                  isInvalid={!!errors?.password}
                />
              </FormControl>
              <FormControl id="password_confirmation">
                <FormLabel>Confirm your password</FormLabel>
                <Input
                  data-cy="registerPasswordConfirmationInput"
                  type="password"
                  {...register('password_confirmation', {
                    required: true,
                  })}
                  isInvalid={
                    !!errors?.password_confirmation ||
                    (passwordWatchers[0] !== passwordWatchers[1] &&
                      passwordWatchers[1].length > 0)
                  }
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  disabled={isSubmitDisabled}
                  isLoading={isLoading}
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
