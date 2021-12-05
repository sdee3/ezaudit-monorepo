const fetchFromApi = async (url: string, method: 'GET' | 'POST', body: object) => {
  try {
    const response = await fetch(`${process.env.API_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const responseJson = await response.json()

    return responseJson
  } catch (error) {
    return error
  }
}

export default fetchFromApi
