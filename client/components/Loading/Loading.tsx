import React from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import theme from '../../utils/theme'

export default function Loading({ enabled }: { enabled: boolean }) {
  if (!enabled) return null

  return <Loader type="ThreeDots" color={theme.colors.primary} height={100} width={100} />
}
