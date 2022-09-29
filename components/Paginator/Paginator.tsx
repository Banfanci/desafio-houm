import React from 'react'

import { Button, Center, Input } from '@chakra-ui/react'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { usePunk } from '../../context/PunkContext'

const Paginator = () => {
  const { pageCount, handlePageChange } = usePunk()

  return (
    <Center>
      <Button
        colorScheme="houmOrange"
        leftIcon={<ChevronLeftIcon />}
        m="2"
        onClick={() => {
          handlePageChange(false)
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
          handlePageChange(true)
        }}
      >
        Next
      </Button>
    </Center>
  )
}

export default Paginator
