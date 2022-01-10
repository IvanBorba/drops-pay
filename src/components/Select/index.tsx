import { useEffect, useState } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps,
  SimpleGrid,
  useStyleConfig,
} from '@chakra-ui/react'

interface IOptions {
  label: string
  value: string | number
}

interface IProps extends SelectProps {
  options: IOptions[]
  placeholder: string
  handleChange: (event: string) => void
  value?: string
  errorMessage?: string
  label?: string
}

const Select = ({
  options,
  placeholder,
  handleChange,
  width = '30rem',
  value,
  label = '',
  errorMessage = '',
  ...rest
}: IProps) => {
  return (
    <FormControl isInvalid={!!errorMessage} maxWidth="50vw">
      <FormLabel minHeight={'24px'}>{label}</FormLabel>
      <ChakraSelect
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        width={width}
        value={value}
        {...rest}
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </ChakraSelect>
      <SimpleGrid minHeight={'8'}>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </SimpleGrid>
    </FormControl>
  )
}

export default Select
