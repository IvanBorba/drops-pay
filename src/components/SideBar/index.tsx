import { HiDocument } from 'react-icons/hi'

import { Box, Divider, Flex, Image } from '@chakra-ui/react'

import logo from '../../assets/images/logo.png'
import NavItem from './navItem'

const SideBar = () => {
  return (
    <Box minH="100vh">
      <Flex
        h="157"
        alignItems="center"
        pl="7.5rem"
        pr="9.5rem"
        py="5vh"
        bg="#F8F9FA"
      >
        <Image src={logo} alt="Logo" />
      </Flex>
      <Flex justifyContent="center" mb="8vh">
        <Divider w="85%" />
      </Flex>
      <Flex flexDirection="column" px="2vw">
        <NavItem
          Icon={HiDocument}
          title="Dashboard"
          description="Centralize seus dados"
        />
        <NavItem
          Icon={HiDocument}
          title="Grupos de empresa"
          description="Crie e visualize os seus grupos"
        />
        <NavItem
          Icon={HiDocument}
          title="Pontos de venda"
          description="Crie e visualize os seus pontos"
        />
        <NavItem
          Icon={HiDocument}
          title="Produtos"
          description="Gerencie os seus produtos"
        />
        <NavItem
          Icon={HiDocument}
          title="Benefícios"
          description="Crie e visualize os benefícios"
        />
      </Flex>
    </Box>
  )
}

export default SideBar
