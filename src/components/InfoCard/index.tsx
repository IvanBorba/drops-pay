import { useNavigate } from 'react-router-dom'

import { Box, Link, Text } from '@chakra-ui/react'

interface IProps {
  number: number
  text: string
  page: string
}

const InfoCard = ({ number, text, page }: IProps) => {
  const navigate = useNavigate()
  return (
    <Box
      textAlign="start"
      width="15vw"
      height="15.5vh"
      borderWidth="1px"
      borderColor="gray.400"
      borderRadius="lg"
      boxShadow="rgba(73, 33, 33, 0.25) -15px 15px 25px -12px;"
      pt="1rem"
      pl="1.2rem"
      mr="3rem"
    >
      <Text color="green.500" fontSize="4xl">
        {number}
      </Text>
      <Text mb="1rem" color="grey.400" fontSize="sm">
        {text}
      </Text>
      <Link
        ml="8rem"
        fontSize="sm"
        color="green.500"
        onClick={() => navigate(`/${page}`)}
      >
        Ir para página -&gt;
      </Link>
    </Box>
  )
}

export default InfoCard
