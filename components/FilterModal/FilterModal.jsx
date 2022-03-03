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
import PropTypes from 'prop-types'

function FilterField({ name, description, handleChange, data }) {
  return (
    <Flex mt="3" mb="6">
      <Box>
        <Text
          fontWeight="semibold"
          as="h4"
          color="houmLetters.title"
          casing="uppercase"
        >
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
            onChange={value => {
              handleChange({ name: `${name}_gt`, value })
            }}
            name={`${name}_gt`}
            value={data.gt}
            min="0"
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
            onChange={value => {
              handleChange({ name: `${name}_lt`, value })
            }}
            name={`${name}_lt`}
            value={data.lt}
            min="0"
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

FilterField.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  handleChange: PropTypes.func,
  data: PropTypes.exact({
    gt: PropTypes.string,
    lt: PropTypes.string,
  }),
}

function FilterModal({ onInputChange, data, onSubmit }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleChange = ({ name, value }) => {
    onInputChange({ name, value })
  }

  const handleClick = () => {
    onSubmit()
    onClose()
  }

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
              name="ibu"
              description="International Bitterness Units"
              handleChange={handleChange}
              data={{ gt: data.ibu_gt, lt: data.ibu_lt }}
            />
            <FilterField
              name="ebc"
              description="European Brewery Convention"
              handleChange={handleChange}
              data={{ gt: data.ebc_gt, lt: data.ebc_lt }}
            />
            <FilterField
              name="abv"
              description="Alcohol By Volume"
              handleChange={handleChange}
              data={{ gt: data.abv_gt, lt: data.abv_lt }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="houmOrange" mr={3} onClick={handleClick}>
              Apply Filter
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

FilterModal.propTypes = {
  onInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
  data: PropTypes.exact({
    ibu_gt: PropTypes.string,
    ibu_lt: PropTypes.string,
    abv_gt: PropTypes.string,
    abv_lt: PropTypes.string,
    ebc_gt: PropTypes.string,
    ebc_lt: PropTypes.string,
  }),
}

export default FilterModal
