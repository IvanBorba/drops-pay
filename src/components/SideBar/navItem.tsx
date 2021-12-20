import { useState } from 'react'
import { IconType } from 'react-icons'

import { Flex, Text } from '@chakra-ui/react'

interface IProps {
  Icon: IconType
  title: string
  description: string
  serviceNumber: number
  onClick: () => void
}

const NavItem = ({
  Icon,
  title,
  description,
  serviceNumber,
  onClick,
}: IProps) => {
  const [bgColor, setBgColor] = useState<string>(`service${serviceNumber}.50`)
  const [iconColor, setIconColor] = useState<string>(
    serviceNumber === 1
      ? '#0AB2BF'
      : serviceNumber === 2
      ? '#E8D55D'
      : serviceNumber === 3
      ? '#12B886'
      : serviceNumber === 4
      ? '#FE7E7E'
      : '#7B61FF'
  )

  return (
    <Flex
      onClick={onClick}
      w="100%"
      height="8vh"
      border="0.5px solid #F8F9FA"
      borderRadius="8"
      pl="1vw"
      py="1vh"
      alignItems="center"
      mt="2.3rem"
      cursor="pointer"
      _hover={{
        border: `0.5px solid ${
          serviceNumber === 1
            ? '#0AB2BF'
            : serviceNumber === 2
            ? '#E8D55D'
            : serviceNumber === 3
            ? '#12B886'
            : serviceNumber === 4
            ? '#FE7E7E'
            : '#7B61FF'
        }`,
      }}
      onMouseOver={() => {
        setBgColor(`service${serviceNumber}.100`)
        setIconColor('white')
      }}
      onMouseOut={() => {
        setBgColor(`service${serviceNumber}.50`)
        setIconColor(
          serviceNumber === 1
            ? '#0AB2BF'
            : serviceNumber === 2
            ? '#E8D55D'
            : serviceNumber === 3
            ? '#12B886'
            : serviceNumber === 4
            ? '#FE7E7E'
            : '#7B61FF'
        )
      }}
    >
      <Flex
        bg={bgColor}
        borderRadius="50"
        w={50}
        h={50}
        alignItems="center"
        justifyContent="center"
        role="icon"
      >
        <Icon color={iconColor} />
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
