import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'

interface IProps extends ButtonProps {
  text: string
  onClick?: () => void
  variant?: string
  color?: 'gray' | 'green'
}

const Button = ({
  text,
  onClick,
  variant = 'default',
  color = 'green',
  ...rest
}: IProps) => {
  const contrastColor = {
    green: '#fff',
    gray: '#868E96',
  }

  return (
    <ChakraButton
      colorScheme={color}
      width={
        variant === 'small' ? 'minmax(60px, 88px)' : 'minmax(118px, 180px)'
      }
      height={variant === 'small' ? 'minmax(20px, 26px)' : 'minmax(30px, 48px)'}
      p={variant === 'small' ? '5px 15px' : '13px 20px'}
      onClick={onClick}
      fontSize={variant === 'small' ? 'sm' : 'md'}
      minWidth={'36'}
      color={contrastColor[color]}
      {...rest}
    >
      {text}
    </ChakraButton>
  )
}

export default Button
