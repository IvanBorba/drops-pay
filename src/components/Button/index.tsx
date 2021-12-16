import { Button as ChakraButton } from '@chakra-ui/react'

interface IProps {
  text: string
  onClick: () => void
  variant?: string
}

const Button = ({ text, onClick, variant = 'default' }: IProps) => {
  return (
    <ChakraButton
      colorScheme="green"
      width={
        variant === 'small' ? 'minmax(60px, 88px)' : 'minmax(118px, 180px)'
      }
      height={variant === 'small' ? 'minmax(20px, 26px)' : 'minmax(30px, 48px)'}
      borderRadius="30px"
      p={variant === 'small' ? '5px 15px' : '13px 20px'}
      onClick={onClick}
      fontSize={variant === 'small' ? 'sm' : 'md'}
      _hover={{ bg: 'green.400' }}
    >
      {text}
    </ChakraButton>
  )
}

export default Button
