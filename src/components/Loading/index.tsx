import { Flex, Spinner } from '@chakra-ui/react'

interface ILoadingProps {
  isLoading: boolean
}

export const Loading = ({ isLoading }: ILoadingProps) => {
  return (
    <Flex
      width={'100%'}
      height={'100%'}
      alignItems={'center'}
      left={0}
      top={0}
      bottom={0}
      right={0}
      justifyContent={'center'}
      position={'absolute'}
      display={isLoading ? 'flex' : 'none'}
      bg={'gray.400'}
      opacity={0.5}
      zIndex={3}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  )
}
