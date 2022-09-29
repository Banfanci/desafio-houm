import React from 'react'

import {
  Box,
  Center,
  CircularProgress,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import HeroCard from '../HeroCard/HeroCard'

const EmptyData = () => {
  return (
    <Box justifyContent="center" m="3rem">
      <Image src="/assets/noData.svg" w="25em" alt="noData" />
      <Text
        fontSize="2rem"
        color="houmLetters.title"
      >{`Didn't match any data`}</Text>
    </Box>
  )
}

export default EmptyData
