import { useCallback, useState } from 'react'

const useAlert = () => {
  const [alertMessage, setAlertMessage] = useState('')

  const onAlertClose = useCallback(() => {
    setAlertMessage('')
  }, [])

  return {
    alertMessage,
    setAlertMessage,
    onAlertClose,
  }
}

export default useAlert
