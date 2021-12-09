import {
  FormControl,
  Input as ChackraInput,
  FormLabel,
  InputProps,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useField } from 'formik'

interface IInputProps extends InputProps {
  name: string
  label: string
  width?: string | number
}

export const Input = ({ name, label, width, ...rest }: IInputProps) => {
  const [field, meta] = useField(name)

  return (
    <FormControl width={width}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <ChackraInput {...rest} {...field} id={field.name} />
      {meta.error && meta.touched && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  )
}
