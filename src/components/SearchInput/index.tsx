import { ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'

import { Input, InputGroup } from '@chakra-ui/react'

interface IProps {
  text: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
}

const SearchInput = ({ text, onChange, value }: IProps) => {
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
