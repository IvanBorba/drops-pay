import { Button as ChakraButton } from '@chakra-ui/react'

interface IProps {
  text: string
  onClick: () => void
}

const Button = ({ text, onClick }: IProps) => {
  return (
    <ChakraButton
      colorScheme="green"
      width="minmax(118px, 180px)"
      height="48px"
      borderRadius="30px"
      p="13px 20px"
      onClick={onClick}
    >
      {text}
    </ChakraButton>
  )
}

export default Button
