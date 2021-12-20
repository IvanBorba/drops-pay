import { HiDocument } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { Box, Flex, Image } from '@chakra-ui/react'

import logo from '../../assets/images/logo.png'
import NavItem from './navItem'

const SideBar = () => {
  const navigate = useNavigate()
  return (
    <Box minH="100vh">
      <Flex h="157" alignItems="center" justifyContent="center" bg="#F8F9FA">
        <Image src={logo} alt="Logo" w="157px" />
      </Flex>
      <Flex flexDirection="column" px="2vw">
        <NavItem
          Icon={HiDocument}
          title="Dashboard"
          description="Centralize seus dados"
          serviceNumber={1}
          onClick={() => navigate('/')}
        />
        <NavItem
          Icon={HiDocument}
          title="Grupos de empresas"
          description="Crie e visualize os seus grupos"
          serviceNumber={2}
          onClick={() => navigate('/grupos-de-empresas')}
        />
        <NavItem
          Icon={HiDocument}
          title="Pontos de venda"
          description="Crie e visualize os seus pontos"
          serviceNumber={3}
          onClick={() => navigate('/pontos-de-venda')}
        />
        <NavItem
          Icon={HiDocument}
          title="Produtos"
          description="Gerencie os seus produtos"
          serviceNumber={4}
          onClick={() => navigate('/produtos')}
        />
        <NavItem
          Icon={HiDocument}
          title="Benefícios"
          description="Crie e visualize os benefícios"
          serviceNumber={5}
          onClick={() => navigate('/beneficios')}
        />
      </Flex>
    </Box>
  )
}

export default SideBar
