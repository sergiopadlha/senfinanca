import { VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import ResumoTransacoesFinanceiras from '../components/resumo/ResumoTransacoesFinanceiras'
import {TransacoesFinanceirasTabela} from '../components/tabela'

const Home: NextPage = () => {
  return (
    <>
        <Head>
            <title>SenFinança</title>
            <meta name="description" content="Controle financeiro" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
        </Head>
        
        <VStack
            maxW="1000" 
            marginX="auto"
            marginTop="10" 
        >
            <ResumoTransacoesFinanceiras />

            <TransacoesFinanceirasTabela />
        </VStack>
    </>
  )
}

export default Home
