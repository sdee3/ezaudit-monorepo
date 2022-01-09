import { ApiResponse, ServerResponse } from '../components/AuditForm/models'

const fetchFromApi = async (
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

    const responseJson: ServerResponse = await response.json()

    return { message: responseJson.message, status: response.status }
  } catch (error) {
    return error
  }
}

export default fetchFromApi
