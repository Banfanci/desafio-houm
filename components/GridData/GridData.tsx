import { CircularProgress, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { usePunk } from '../../context/PunkContext'
import EmptyData from '../EmptyData/EmptyData'
import HeroCard from '../HeroCard/HeroCard'

const GridData = () => {
  const { loading, data } = usePunk()

  if (loading)
    return <CircularProgress isIndeterminate color="houmOrange.500" mt="6" />
  if (data.length === 0) return <EmptyData />

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }}>
      {data.map(item => (
        <HeroCard key={item.id} data={item}></HeroCard>
      ))}
    </SimpleGrid>
  )
}

export default GridData
