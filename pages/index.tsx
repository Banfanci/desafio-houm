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
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'

import FilterModal from '../components/FilterModal/FilterModal'
import Paginator from '../components/Paginator/Paginator'
import GridData from '../components/GridData/GridData'
import { usePunk } from '../context/PunkContext'

const filtersToStrings = {
  abv_gt: 'Min ABV',
  abv_lt: 'Max ABV',
  ibu_gt: 'Min IBU',
  ibu_lt: 'Max IBU',
  ebc_gt: 'Min EBC',
  ebc_lt: 'Max EBC',
}

function Home() {
  const {
    filters,
    handleSearchChange,
    handleQualityDelete,
    handleKeyDown,
    createFilter,
  } = usePunk()
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
                placeholder="Search by name"
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
                  aria-label={''}
                />
              </InputRightElement>
            </InputGroup>
            <FilterModal />
          </Box>
          <Box>
            {Object.keys(filters).map(key => {
              return (
                key.toString() !== 'beer_name' &&
                filters[key] !== '' && (
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
                )
              )
            })}
          </Box>
        </Box>
      </Center>

      <Paginator />
      <Center>
        <GridData />
      </Center>
      <Box mb="2em">
        <Paginator />
      </Box>
    </>
  )
}

export default Home
