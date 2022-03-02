import { Image, Box, Flex, Spacer, Text } from '@chakra-ui/react'

export default function HeroCard({ data }) {
  const { abv, ibu, ebc, name, tagline, brewers_tips, image_url } = data

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
      <Flex mt="4">
        <Image src={image_url} ml="6" fit="contain" h="3.5em" alt="beer" />
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
              {ibu}
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
              {ebc}
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
              {abv}
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
          {name}
        </Box>
        <Box
          as="span"
          color="houmLetters.subTitle"
          fontSize="sm"
          fontWeight="light"
        >
          {tagline}
        </Box>
        <Box
          fontWeight="semibold"
          fontSize="0.8rem"
          color="houmLetters.title"
          mt="2"
        >
          Brewer Tip
        </Box>
        <Box
          color="houmLetters.subTitle"
          fontSize="12px"
          fontWeight="light"
          noOfLines={4}
        >
          {brewers_tips}
        </Box>
      </Box>
    </Box>
  )
}
