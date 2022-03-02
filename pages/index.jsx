import React, { useState, useEffect } from 'react'

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
import axios from 'axios'

import HeroCard from '../components/HeroCard/HeroCard'

export default function Home() {
  const [data, setData] = useState({ results: [] })

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://api.punkapi.com/v2/beers?page=1&per_page=12')
      setData({ results: result.data })
    }

    fetchData()
  }, [])

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
          Filter
        </Button>
      </Center>
      <Center>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }}>
          {data?.results?.map(item => (
            <HeroCard key={item.id} data={item}></HeroCard>
          ))}
        </SimpleGrid>
      </Center>
    </>
  )
}
