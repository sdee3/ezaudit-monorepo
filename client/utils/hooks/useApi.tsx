import { useCallback } from 'react'
import { useCookies } from 'react-cookie'

import { ApiResponse } from '../../models'

const useApi = () => {
  const [cookies] = useCookies()

  const fetchFromApi = useCallback(
    async (url: string, method: 'GET' | 'POST', body?: object) => {
      try {
        const response = await fetch(`${process.env.API_URL}${url}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${cookies['accessToken']}`,
          },
          mode:
            process.env.API_URL === 'https://ezaudit.me'
              ? 'same-origin'
              : 'cors',
          body: body && JSON.stringify(body),
        })

        const parsedBody = await response.json()

        return {
          message: parsedBody.message,
          status: response.status,
          ...parsedBody,
        } as ApiResponse
      } catch (error) {
        return error
      }
    },
    [cookies]
  )

  return { fetchFromApi }
}

export { useApi }
