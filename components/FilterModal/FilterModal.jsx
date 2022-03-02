import React from 'react'

import { SettingsIcon } from '@chakra-ui/icons'
import {
  Button,
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'

function FilterField({ name, description }) {
  return (
    <Flex mt="3" mb="6">
      <Box>
        <Text fontWeight="semibold" as="h4" color="houmLetters.title">
          {name}
        </Text>
        <Text fontSize="1rem" color="houmLetters.subTitle" fontWeight="light">
          {description}
        </Text>
      </Box>
      <Spacer />
      <Box display="flex" alignItems="baseline" mt="6">
        <Box>
          <NumberInput
            size="sm"
            maxW={24}
            precision={1}
            step={0.1}
            focusBorderColor="houmOrange.400"
          >
            <NumberInputField placeholder="Min" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Spacer />
        <Box pl="6">
          <NumberInput
            size="sm"
            maxW={24}
            precision={1}
            step={0.1}
            focusBorderColor="houmOrange.400"
          >
            <NumberInputField placeholder="Max" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Box>
    </Flex>
  )
}

export default function FilterModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        onClick={onOpen}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="35vw">
          <ModalHeader>Filter your beer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FilterField
              name="IBU"
              description="International Bitterness Units"
            ></FilterField>
            <FilterField
              name="EBC"
              description="European Brewery Convention"
            ></FilterField>
            <FilterField
              name="ABV"
              description="Alcohol By Volume"
            ></FilterField>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="houmOrange" mr={3}>
              Apply Filter
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
