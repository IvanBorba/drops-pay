import { useEffect, useState } from 'react'

import {
  Select as ChakraSelect,
  SelectProps,
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
}

const Select = ({
  options,
  placeholder,
  handleChange,
  width = '30rem',
  value,
  ...rest
}: IProps) => {
  return (
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
  )
}

export default Select
