import { ReactNode } from 'react'

import {
  FormControl,
  Input as ChackraInput,
  FormLabel,
  InputProps,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Switch,
} from '@chakra-ui/react'
import { useField } from 'formik'

interface IInputProps extends InputProps {
  name: string
  label: string
  width?: string | number
  rightElement?: ReactNode
  variant?: 'switch' | 'input'
}

export const Input = ({
  name,
  label,
  width,
  rightElement,
  pr,
  variant = 'input',
  ...rest
}: IInputProps) => {
  const [field, meta] = useField(name)

  const variants = {
    input: <ChackraInput {...rest} {...field} id={field.name} />,
    switch: <Switch isChecked={field.value} {...field} id={field.name} />,
  }

  return (
    <FormControl width={width}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        {variants[variant]}
        {rightElement && (
          <InputRightElement width={pr} pr={'2'}>
            {rightElement}
          </InputRightElement>
        )}
      </InputGroup>
      {meta.error && meta.touched && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  )
}
