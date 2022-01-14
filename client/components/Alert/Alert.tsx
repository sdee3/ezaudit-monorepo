import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  AlertProps,
} from '@chakra-ui/react'
import { FC } from 'react'

type Props = AlertProps & {
  alertTitle?: string
  alertMessage: string
  onCloseCallback: () => void
}

const Alert: FC<Props> = ({
  alertMessage,
  alertTitle,
  onCloseCallback,
  ...rest
}) => (
  <ChakraAlert status={rest.status} {...rest}>
    <AlertIcon />
    <AlertDescription mx={3}>{alertMessage}</AlertDescription>
    <CloseButton
      position="absolute"
      onClick={onCloseCallback}
      right="8px"
      top="8px"
    />
  </ChakraAlert>
)

export default Alert
