import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie'

import Alert from '../Alert'
import { SignInInputValues } from '../../models'
import {
  EMAIL_REGEX_PATTERN,
  UNAUTHORIZED_STATUS_CODE,
  useApi,
} from '../../utils'
import useAlert from '../Alert/hooks'

interface Props {
  setIsUnauthorized: Dispatch<SetStateAction<boolean>>
}

const SignInForm = ({ setIsUnauthorized }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputValues>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie, removeCookie] = useCookies()
  const { fetchFromApi } = useApi()
  const [isLoading, setIsLoading] = useState(false)
  const { alertMessage, setAlertMessage, onAlertClose } = useAlert()

  const onSubmit: SubmitHandler<SignInInputValues> = useCallback(
    async ({ email, password }) => {
      try {
        setIsLoading(true)

        const response = await fetchFromApi('/api/auth/login', 'POST', {
          email,
          password,
        })

        if (response.status === UNAUTHORIZED_STATUS_CODE) {
          setAlertMessage({
            message: 'The data you entered is incorrect. Please try again.',
            state: 'error',
          })

          return
        }

        setIsUnauthorized(false)
        setCookie('accessToken', response.access_token)
      } catch (error) {
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    },
    [fetchFromApi, setAlertMessage, setCookie, setIsUnauthorized]
  )

  useEffect(() => {
    removeCookie('accessToken')
  }, [removeCookie])

  const { message, state } = alertMessage

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <form onSubmit={() => handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  data-cy="signInEmailInput"
                  type="email"
                  {...register('email', {
                    required: true,
                    pattern: EMAIL_REGEX_PATTERN,
                  })}
                  errorBorderColor="red.500"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  data-cy="signInPasswordInput"
                  type="password"
                  {...register('password', {
                    required: true,
                  })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  disabled={!!errors?.email || !!errors?.password}
                  isLoading={isLoading}
                  onClick={handleSubmit(onSubmit)}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
          {message?.length > 0 && (
            <Alert
              marginTop={6}
              alertMessage={message}
              onCloseCallback={onAlertClose}
              status={state}
            />
          )}
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignInForm
