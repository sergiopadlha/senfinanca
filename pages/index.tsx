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
            <link rel="icon" href="../public\favicon.ico" />
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
