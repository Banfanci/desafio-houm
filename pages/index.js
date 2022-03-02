import { Box, Image } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box boxShadow="md" rounded="md" h="4vw">
      <Image
        src="/assets/houmLogo.svg"
        h="3vw"
        margin="1vw 2vw"
        alt="houmLogo"
      />
    </Box>
  )
}
