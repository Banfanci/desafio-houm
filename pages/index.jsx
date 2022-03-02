import { SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  IconButton,
  Center,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  SimpleGrid,
} from '@chakra-ui/react'

import HeroCard from '../components/HeroCard/HeroCard'

export default function Home() {
  return (
    <>
      <Box boxShadow="md" rounded="md" h="4em">
        <Image src="/assets/houmLogo.svg" h="3em" m="5" alt="houmLogo" />
      </Box>
      <Center margin="2em">
        <InputGroup size="md" w={{ base: '60vw', lg: '40vw' }}>
          <Input
            placeholder="Busca por nombre"
            focusBorderColor="houmOrange.100"
          />
          <InputRightElement w={{ base: '10vw', lg: '4.5vw' }}>
            <IconButton
              icon={<SearchIcon />}
              isRound
              size="sm"
              variant="outline"
              colorScheme="houmOrange"
            />
          </InputRightElement>
        </InputGroup>
        <Button
          leftIcon={<SettingsIcon />}
          colorScheme="houmBlue"
          size="md"
          borderRadius="30px"
          w={{ base: '18vw', md: '14vw', lg: '10vw' }}
          m="4"
          p="4"
        >
          Filtrar
        </Button>
      </Center>
      <Center>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }}>
          <HeroCard></HeroCard>
        </SimpleGrid>
      </Center>
    </>
  )
}
