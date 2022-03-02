import React, { useState, useEffect } from 'react'

import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  IconButton,
  Center,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  SimpleGrid,
} from '@chakra-ui/react'
import axios from 'axios'

import FilterModal from '../components/FilterModal/FilterModal'
import HeroCard from '../components/HeroCard/HeroCard'

export default function Home() {
  const [data, setData] = useState({ results: [] })
  const [query, setQuery] = useState('')

  const [filters, setFilters] = useState({ beer_name: '' })

  const handleChange = e => {
    const { name, value } = e.target
    setFilters(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const createFilter = () => {
    let filter = ''
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '') {
        filter += `&${key}=${value}`
      }
    })
    setQuery(filter)
  }

  const handleClick = () => {
    createFilter()
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      createFilter()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.punkapi.com/v2/beers?page=1&per_page=12${query}`,
      )
      setData({ results: result.data })
    }

    fetchData()
  }, [query])

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
            name="beer_name"
            value={filters.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement w={{ base: '10vw', lg: '4.5vw' }}>
            <IconButton
              icon={<SearchIcon />}
              isRound
              size="sm"
              variant="outline"
              colorScheme="houmOrange"
              onClick={handleClick}
            />
          </InputRightElement>
        </InputGroup>
        <FilterModal />
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
