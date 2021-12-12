import { ReactNode } from 'react'

import {
  FormControl,
  Input as ChackraInput,
  FormLabel,
  InputProps,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useField } from 'formik'

interface IInputProps extends InputProps {
  name: string
  label: string
  width?: string | number
  rightElement?: ReactNode
}

export const Input = ({
  name,
  label,
  width,
  rightElement,
  pr,
  ...rest
}: IInputProps) => {
  const [field, meta] = useField(name)

  return (
    <FormControl width={width}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <ChackraInput {...rest} {...field} id={field.name} />
        <InputRightElement width={pr} pr={'2'}>
          {rightElement}
        </InputRightElement>
      </InputGroup>
      {meta.error && meta.touched && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  )
}
