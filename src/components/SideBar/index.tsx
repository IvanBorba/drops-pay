import {
  FaTh,
  FaVectorSquare,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaUserFriends,
  FaPollH,
} from 'react-icons/fa'
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
          Icon={FaTh}
          title="Dashboard"
          description="Centralize seus dados"
          serviceNumber={1}
          onClick={() => navigate('/')}
        />
        <NavItem
          Icon={FaVectorSquare}
          title="Grupos de empresas"
          description="Crie e visualize os seus grupos"
          serviceNumber={2}
          onClick={() => navigate('/grupos-de-empresas')}
        />
        <NavItem
          Icon={FaMapMarkerAlt}
          title="Pontos de venda"
          description="Crie e visualize os seus pontos"
          serviceNumber={3}
          onClick={() => navigate('/pontos-de-venda')}
        />
        <NavItem
          Icon={FaUserFriends}
          title="Grupos de Clientes"
          description="Gerencie seus grupos de clientes"
          serviceNumber={4}
          onClick={() => navigate('/grupos-de-clientes')}
        />
        <NavItem
          Icon={FaShoppingCart}
          title="Grupos de Produtos"
          description="Gerencie os seus produtos"
          serviceNumber={5}
          onClick={() => navigate('/produtos')}
        />
        <NavItem
          Icon={FaPollH}
          title="Benefícios"
          description="Crie e visualize os benefícios"
          serviceNumber={1}
          onClick={() => navigate('/beneficios')}
        />
      </Flex>
    </Box>
  )
}

export default SideBar
