import React, { useCallback, useMemo } from 'react'
import { useCookies } from 'react-cookie'

import { User } from '../../../models'

interface AuthContextType {
  user: User | null
  accessToken: string | null
  setUserData: (user: object, accessToken: string) => void
  clearUser: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  accessToken: null,
  setUserData: (_user: object, _accessToken: string) => null,
  clearUser: () => null,
})

export const useAuthContext = () => {
  const [cookies, setCookie, removeCookie] = useCookies()

  const accessToken: string | null = useMemo(
    () => cookies['accessToken'],
    [cookies]
  )

  const user: User | null = useMemo(
    () => (cookies['user'] as User) ?? null,
    [cookies]
  )

  const setUserData = useCallback(
    (user: object, accessToken: string) => {
      setCookie('user', JSON.stringify(user))
      setCookie('accessToken', accessToken)
    },
    [setCookie]
  )

  const clearUser = useCallback(() => {
    removeCookie('user')
    removeCookie('accessToken')
  }, [removeCookie])

  return { AuthContext, accessToken, user, setUserData, clearUser }
}
