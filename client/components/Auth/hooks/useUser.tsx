import { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export const useUser = () => {
  const [user, setUser] = useState<object | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, _setCookie, removeCookie] = useCookies()

  useEffect(() => {
    if (!cookies.user) {
      if (!user) return

      setUser(null)
    }

    setUser(cookies.user)
  }, [cookies.user, user])

  const clearUser = useCallback(() => {
    setUser(null)
    removeCookie('user')
    removeCookie('accessToken')
  }, [removeCookie])

  return { user, clearUser }
}
