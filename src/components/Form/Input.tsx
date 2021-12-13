import { ReactNode } from 'react'
import InputMask from 'react-input-mask'

import {
  FormControl,
  Input as ChackraInput,
  FormLabel,
  InputProps,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Switch,
  SimpleGrid,
} from '@chakra-ui/react'
import { useField } from 'formik'

interface IInputProps extends InputProps {
  name: string
  label?: string
  width?: string | number
  rightElement?: ReactNode
  variant?: 'switch' | 'input'
  mask?: string | Array<string | RegExp>
}

export const Input = ({
  name,
  label,
  width,
  rightElement,
  pr,
  variant = 'input',
  mask,
  ...rest
}: IInputProps) => {
  const [field, meta] = useField(name)

  const variants = {
    input: (
      <ChackraInput
        as={InputMask}
        mask={mask}
        {...rest}
        {...field}
        id={field.name}
      />
    ),
    switch: <Switch isChecked={field.value} {...field} id={field.name} />,
  }

  return (
    <FormControl width={width} isInvalid={meta.touched && !!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        {variants[variant]}
        {rightElement && (
          <InputRightElement width={pr} pr={'2'}>
            {rightElement}
          </InputRightElement>
        )}
      </InputGroup>
      <SimpleGrid minHeight={'8'}>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </SimpleGrid>
    </FormControl>
  )
}
