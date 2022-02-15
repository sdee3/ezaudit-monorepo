import { Link, Text } from '@chakra-ui/react'
import { useState } from 'react'

import { SignInForm, RegisterForm } from './components'

export const AuthWrapper = () => {
  const [option, setOption] = useState<'login' | 'register'>('login')
  const [isNewlyRegistered, setIsNewlyRegistered] = useState(false)

  const switchToRegister = () => setOption('register')
  const switchToLogin = (registered?: boolean) => {
    setOption('login')
    registered && setIsNewlyRegistered(true)
  }

  return (
    <>
      {option === 'login' && (
        <>
          <SignInForm isNewlyRegistered={isNewlyRegistered} />

          {!isNewlyRegistered && (
            <Text align="center" fontSize="lg" mb={20} color="gray.600">
              Don&apos;t have an account?{' '}
              <Link color="blue.400" onClick={switchToRegister}>
                Register instead!
              </Link>
            </Text>
          )}
        </>
      )}
      {option === 'register' && (
        <>
          <RegisterForm
            switchToLoginAfterRegistering={() => switchToLogin(true)}
          />

          <Text align="center" fontSize="lg" mb={20} color="gray.600">
            Already have an account?{' '}
            <Link color="blue.400" onClick={() => switchToLogin()}>
              Sign in now!
            </Link>
          </Text>
        </>
      )}
    </>
  )
}
