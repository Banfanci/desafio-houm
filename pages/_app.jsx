import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  shadows: {
    md: '0 4px 4px 0 rgba(219, 219, 219, 0.25)',
    lg: '0 4px 4px 0 rgba(219, 219, 219, 0.5)',
    outline: '0 0 0 2px rgba(255, 69, 43, 0.4)',
  },
  colors: {
    houmOrange: {
      100: 'rgba(255, 69, 43, 0.4)',
      600: '#FF452B',
    },
    houmBlue: {
      500: '#263238',
      600: '#607D8B',
    },
    houmLetters: {
      title: '#212121',
      subTitle: '#607D8B',
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp