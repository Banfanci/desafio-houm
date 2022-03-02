import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react'

export default function HeroCard() {
  return (
    <Box
      bg="white"
      w={{ base: '64vw', md: '40vw', lg: '32vw', xl: '24vw' }}
      h="15em"
      m="5"
      borderRadius="12px"
      boxShadow="lg"
      borderColor="#E9E9E9"
      borderWidth="0.5px"
    >
      <Flex mt="6">
        <Avatar
          name="Oshigaki Kisame"
          src="https://bit.ly/dan-abramov"
          ml="6"
        />
        <Spacer />
        <Flex width="10em">
          <Box>
            <Text
              fontSize="12px"
              color="houmLetters.subTitle"
              fontWeight="light"
            >
              IBU
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              10
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text
              fontSize="12px"
              color="houmLetters.subTitle"
              fontWeight="light"
            >
              EBC
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              10
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text
              fontSize="12px"
              color="houmLetters.subTitle"
              fontWeight="light"
            >
              ABV
            </Text>
            <Text fontSize="lg" color="houmOrange.600" fontWeight="bold">
              10
            </Text>
          </Box>
          <Spacer />
        </Flex>
      </Flex>

      <Box p="4">
        <Box
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          color="houmLetters.title"
        >
          Punk IPA 2007 - 2010
        </Box>
        <Box
          as="span"
          color="houmLetters.subTitle"
          fontSize="sm"
          fontWeight="light"
        >
          Post Modern Classic. Spiky. Tropical. Hoppy.
        </Box>
        <Box
          fontWeight="semibold"
          fontSize="0.8rem"
          color="houmLetters.title"
          mt="2"
        >
          Descripción
        </Box>
        <Box
          color="houmLetters.subTitle"
          fontSize="12px"
          fontWeight="light"
          noOfLines={4}
        >
          While it may surprise you, this version of Punk IPA isn't dry hopped
          but still packs a punch! To make the best of the aroma hops make sure
          they are fully submerged and add them just before knock out for an
          intense hop hit.
        </Box>
      </Box>
    </Box>
  )
}
