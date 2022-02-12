import { useCallback } from 'react'
import { useCookies } from 'react-cookie'

import { ApiResponse } from '../../models'
import { ERROR_CODES } from '../constants'

const useApi = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, _setCookie, removeCookie] = useCookies()

  const fetchFromApi = useCallback(
    async (
      url: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE',
      body?: object
    ) => {
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

        if (ERROR_CODES.includes(response.status)) {
          throw new Error(response.status.toString())
        }

        return {
          message: parsedBody.message,
          status: response.status,
          ...parsedBody,
        } as ApiResponse
      } catch (error) {
        return { status: Number.parseInt(error.message) }
      }
    },
    [cookies]
  )

  return { fetchFromApi }
}

export { useApi }
