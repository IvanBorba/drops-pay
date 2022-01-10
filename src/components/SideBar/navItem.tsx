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
      : serviceNumber === 5
      ? '#7B61FF'
      : '#3E7B80'
  )

  return (
    <Flex
      onClick={onClick}
      w="100%"
      height="8vh"
      border="0.5px solid #F8F9FA"
      borderRadius="8"
      px="1vw"
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
            : serviceNumber === 5
            ? '#7B61FF'
            : '#3E7B80'
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
            : serviceNumber === 5
            ? '#7B61FF'
            : '#3E7B80'
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
        <Text
          mb="0.3rem"
          ml="0.5rem"
          fontSize="sm"
          letterSpacing="1px"
          fontWeight="bold"
        >
          {title}
        </Text>
        <Text
          ml="0.5rem"
          color="grey.400"
          fontSize="xs"
          letterSpacing="1px"
          whiteSpace="nowrap"
        >
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}

export default NavItem
