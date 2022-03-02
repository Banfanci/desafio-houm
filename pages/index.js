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
} from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Box boxShadow="md" rounded="md" h="4vw">
        <Image
          src="/assets/houmLogo.svg"
          h="3vw"
          margin="1vw 2vw"
          alt="houmLogo"
        />
      </Box>
      <Center margin="5vw">
        <InputGroup size="md" width="40vw">
          <Input
            pr="4.5rem"
            placeholder="Busca por nombre"
            focusBorderColor="houmOrange.100"
          />
          <InputRightElement width="4.5rem">
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
          w="8vw"
          ml="2vw"
        >
          Filtrar
        </Button>
      </Center>
    </>
  )
}
