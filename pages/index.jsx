import React, { useState, useEffect } from 'react'

import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  CircularProgress,
  Button,
  IconButton,
  Center,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  SimpleGrid,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import PropTypes from 'prop-types'

import FilterModal from '../components/FilterModal/FilterModal'
import HeroCard from '../components/HeroCard/HeroCard'

const filtersToStrings = {
  abv_gt: 'Min ABV',
  abv_lt: 'Max ABV',
  ibu_gt: 'Min IBU',
  ibu_lt: 'Max IBU',
  ebc_gt: 'Min EBC',
  ebc_lt: 'Max EBC',
}

function Paginator({ pageCount, onClick }) {
  return (
    <Center>
      <Button
        colorScheme="houmOrange"
        leftIcon={<ChevronLeftIcon />}
        m="2"
        onClick={() => {
          onClick(false)
        }}
      >
        Prev
      </Button>
      <Input
        value={pageCount}
        w="3.5em"
        textAlign="center"
        type="number"
        focusBorderColor="houmOrange.500"
        borderColor="houmOrange.500"
        isReadOnly
      />
      <Button
        colorScheme="houmOrange"
        rightIcon={<ChevronRightIcon />}
        m="2"
        onClick={() => {
          onClick(true)
        }}
      >
        Next
      </Button>
    </Center>
  )
}

Paginator.propTypes = {
  pageCount: PropTypes.number,
  onClick: PropTypes.func,
}

function Home() {
  const [data, setData] = useState({ results: [] })
  const [query, setQuery] = useState('')
  const [pageCount, setPageCount] = useState(1)
  const [loading, setLoading] = useState(false)

  const initQualitiesState = {
    abv_gt: '',
    abv_lt: '',
    ibu_gt: '',
    ibu_lt: '',
    ebc_gt: '',
    ebc_lt: '',
  }

  const [filters, setFilters] = useState({
    beer_name: '',
    ...initQualitiesState,
  })

  const [qualities, setQualities] = useState(initQualitiesState)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await axios(
        `https://api.punkapi.com/v2/beers?page=${pageCount}&per_page=12${query}`,
      )
      setLoading(false)
      setData({ results: result.data })
    }

    fetchData()
  }, [query, pageCount])

  const handleSearchChange = e => {
    const { name, value } = e.target
    setFilters(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleQualityChange = e => {
    const { name, value } = e
    const formatedValue = value.replaceAll(' ', '_')
    setQualities(prevState => ({
      ...prevState,
      [name]: formatedValue,
    }))
  }

  const handleQualityDelete = e => {
    const { name, value } = e
    setQualities(prevState => ({
      ...prevState,
      [name]: value,
    }))
    setFilters(prevState => ({
      ...prevState,
      [name]: value,
    }))
    createFilter({
      ...filters,
      [name]: value,
    })
  }

  const createFilter = filters => {
    let filter = ''
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '') {
        filter += `&${key}=${value}`
      }
    })
    setQuery(filter)
    setPageCount(1)
  }

  const handleQualitiesSet = () => {
    setFilters(prevState => ({
      ...prevState,
      ...qualities,
    }))
    createFilter({ ...filters, ...qualities })
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      createFilter(filters)
    }
  }

  const handlePageChange = add => {
    const val = add ? 1 : -1
    const newPageCount = pageCount + val
    newPageCount > 0 ? setPageCount(newPageCount) : setPageCount(1)
  }

  return (
    <>
      <Box boxShadow="md" rounded="md" h="4em">
        <Image src="/assets/houmLogo.svg" h="3em" m="5" alt="houmLogo" />
      </Box>
      <Center margin="1em">
        <Box>
          <Box display="flex" alignItems="baseline">
            <InputGroup size="md" w={{ base: '60vw', lg: '40vw' }}>
              <Input
                placeholder="Busca por nombre"
                focusBorderColor="houmOrange.100"
                name="beer_name"
                value={filters.beer_name}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <InputRightElement w={{ base: '10vw', lg: '4.5vw' }}>
                <IconButton
                  icon={<SearchIcon />}
                  isRound
                  size="sm"
                  variant="outline"
                  colorScheme="houmOrange"
                  onClick={() => {
                    createFilter(filters)
                  }}
                />
              </InputRightElement>
            </InputGroup>
            <FilterModal
              onInputChange={handleQualityChange}
              data={qualities}
              onSubmit={handleQualitiesSet}
            />
          </Box>
          <Box>
            {Object.keys(filters).map(key => {
              return key.toString() !== 'beer_name' && filters[key] !== '' ? (
                <Tag
                  key={key}
                  borderRadius="full"
                  variant="solid"
                  bg="houmOrange.50"
                  mr="2"
                  mb="2"
                >
                  <TagLabel color="houmOrange.500">
                    {`${filtersToStrings[key]} ${filters[key]}`}
                  </TagLabel>
                  <TagCloseButton
                    color="houmOrange.500"
                    onClick={() => {
                      handleQualityDelete({ name: key, value: '' })
                    }}
                  />
                </Tag>
              ) : (
                <></>
              )
            })}
          </Box>
        </Box>
      </Center>
      <Paginator pageCount={pageCount} onClick={handlePageChange} />
      <Center>
        {loading ? (
          <CircularProgress isIndeterminate color="houmOrange.500" mt="6" />
        ) : data.results.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }}>
            {data?.results?.map(item => (
              <HeroCard key={item.id} data={item}></HeroCard>
            ))}
          </SimpleGrid>
        ) : (
          <Box align="center" m="3rem">
            <Image src="/assets/noData.svg" w="25em" alt="noData" />
            <Text
              fontSize="2rem"
              color="houmLetters.title"
            >{`Didn't match any data`}</Text>
          </Box>
        )}
      </Center>
      <Box mb="2em">
        <Paginator pageCount={pageCount} onClick={handlePageChange} />
      </Box>
    </>
  )
}

export default Home
