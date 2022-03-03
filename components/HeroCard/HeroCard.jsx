import { Image, Box, Flex, Spacer, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

function Quality({ name, value, important }) {
  return (
    <Box>
      <Text fontSize="12px" color="houmLetters.subTitle" fontWeight="light">
        {name}
      </Text>
      {!important ? (
        <Text fontSize="lg" fontWeight="semibold">
          {value || '-'}
        </Text>
      ) : (
        <Text fontSize="lg" color="houmOrange.600" fontWeight="bold">
          {value}
        </Text>
      )}
    </Box>
  )
}

Quality.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  important: PropTypes.bool,
}

function HeroCard({ data }) {
  const { abv, ibu, ebc, name, tagline } = data
  const brewersTips = data.brewers_tips
  const imageUrl = data.image_url

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
        <Image
          src={imageUrl}
          ml="6"
          fit="contain"
          h="3.5em"
          alt="beer"
          fallbackSrc="https://images.punkapi.com/v2/keg.png"
        />
        <Spacer />
        <Flex width="10em">
          <Quality name="IBU" value={ibu} important={false} />
          <Spacer />
          <Quality name="EBC" value={ebc} important={false} />
          <Spacer />
          <Quality name="ABV" value={abv} important={true} />
          <Spacer />
        </Flex>
      </Flex>

      <Box p="4">
        <Box fontWeight="semibold" color="houmLetters.title" isTruncated>
          {name}
        </Box>
        <Box
          as="span"
          color="houmLetters.subTitle"
          fontSize="sm"
          fontWeight="light"
          isTruncated
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
          {brewersTips}
        </Box>
      </Box>
    </Box>
  )
}

HeroCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    tagline: PropTypes.string,
    abv: PropTypes.number,
    ebc: PropTypes.number,
    ibu: PropTypes.number,
    brewers_tips: PropTypes.string,
    image_url: PropTypes.string,
  }),
}

export default HeroCard
