import { ApiResponse } from '../models'

export const fetchFromApi = async (
  url: string,
  method: 'GET' | 'POST',
  body?: object
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.API_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      mode:
        process.env.API_URL === 'https://ezaudit.me' ? 'same-origin' : 'cors',
      body: body && JSON.stringify(body),
    })

    return {
      message: (await response.json()).message,
      status: response.status,
    } as ApiResponse
  } catch (error) {
    return error
  }
}
