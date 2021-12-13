import { IconType } from 'react-icons'

import { Box, Flex, Text } from '@chakra-ui/react'

interface IProps {
  Icon: IconType
  title: string
  description: string
}

const NavItem = ({ Icon, title, description }: IProps) => {
  return (
    <Flex
      w="100%"
      height="8vh"
      border="0.5px solid #F8F9FA"
      borderRadius="8"
      pl="1vw"
      py="1vh"
      alignItems="center"
    >
      <Flex
        bg="rgba(201, 69, 46, 0.3)"
        _hover={{ bg: 'rgba(201, 69, 46, 1)' }}
        borderRadius="50"
        w={50}
        h={50}
        alignItems="center"
        justifyContent="center"
        role="icon"
      >
        <Box>
          <Icon />
        </Box>
      </Flex>
      <Flex w="80%" flexDirection="column" textAlign="justify">
        <Text ml="0.5rem" fontSize="sm" letterSpacing="1px" fontWeight="bold">
          {title}
        </Text>
        <Text ml="0.5rem" fontSize="xs" letterSpacing="1px" whiteSpace="nowrap">
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}

export default NavItem
