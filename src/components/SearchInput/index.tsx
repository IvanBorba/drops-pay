import { ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'
import InputMask from 'react-input-mask'

import { Input, InputGroup } from '@chakra-ui/react'

interface IProps {
  text: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  cnpj?: boolean
}

const SearchInput = ({ text, onChange, value, cnpj = false }: IProps) => {
  return (
    <InputGroup
      backgroundColor="grey.300"
      alignItems="center"
      pl="1rem"
      borderRadius="30px"
      width="17rem"
      overflow="hidden"
    >
      <FaSearch />
      <Input
        as={InputMask}
        mask={cnpj ? '99.999.999/9999-99' : ''}
        placeholder={text}
        onChange={onChange}
        variant="unstyled"
        ml="0.5rem"
        pt="0.1rem"
        value={value}
      />
    </InputGroup>
  )
}

export default SearchInput
