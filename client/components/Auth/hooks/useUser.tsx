import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export const useUser = () => {
  const [cookies] = useCookies()
  const [user, setUser] = useState<object | null>(null)

  useEffect(() => {
    if (!cookies.user) {
      if (!user) return

      setUser(null)
    }

    setUser(cookies.user)
  }, [cookies.user, user])

  return { user }
}
