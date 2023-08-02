import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { TransacoesFinanceirasProvider } from '../context/TransacoesFinanceirasContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <TransacoesFinanceirasProvider>
                <Box background="#edf2f7" h="100vh" paddingTop="10">
                    <Component {...pageProps} />
                </Box>
            </TransacoesFinanceirasProvider>
        </ChakraProvider>
    )
}

export default MyApp
