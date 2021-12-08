const fetchFromApi = async (url: string, method: 'GET' | 'POST', body: object) => {
  try {
    const response = await fetch(`${process.env.API_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      mode: process.env.API_URL === 'https://ezaudit.me' ? 'same-origin' : 'cors',
      body: JSON.stringify(body),
    })

    const responseJson = await response.json()

    return responseJson
  } catch (error) {
    return error
  }
}

export default fetchFromApi
