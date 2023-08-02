import React, { useEffect, useState } from 'react'
import { HStack, Text, VStack } from '@chakra-ui/react'
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'
import { GrMoney } from 'react-icons/gr'
import { useTransacoesFinanceiras } from '../../context/TransacoesFinanceirasContext';
import formatValue from '../../utils/formatValue';

export default function ResumoTransacoesFinanceiras() {    
    const {transacoesFinanceiras} = useTransacoesFinanceiras()

    const [gastos, setGastos ] = useState(0)
    const [ganhos, setGanhos] = useState(0)
    const [total, setTotal] = useState(0)
    const [corSaldo, setCorSaldo] = useState('black')

    useEffect(() => {
        const sumGanho = transacoesFinanceiras
            .filter(t => t.status === "Entrada")
            .reduce((prev, transaction) => prev + transaction.valor, 0);

        const sumGastos = transacoesFinanceiras
            .filter(t => t.status === "Saida")
            .reduce((prev, transaction) => prev + transaction.valor, 0);

        setGastos(sumGastos);
        setGanhos(sumGanho);
        setTotal(sumGanho - sumGastos);
    }, [transacoesFinanceiras]);
    useEffect(()=> {        
        if (total > 0) setCorSaldo('green')
        if (total < 0) setCorSaldo('red')
        if (total === 0) setCorSaldo('black')        
    },[total])

    return (
        <HStack width="full">
            <HStack background="white" padding="8" borderRadius="8" flex={1} spacing="6">
                <GrMoney size="40" />

                <VStack alignItems="initial">
                    <Text fontSize="xl" color="gray">
                        Saldo
                    </Text>

                    <Text fontSize="2xl" fontWeight="semibold" color={corSaldo}>
                        {formatValue(total)}
                    </Text>
                </VStack>
            </HStack>

            <HStack background="white" padding="8" borderRadius="8" flex={1} spacing="6">
                <AiOutlineArrowUp color='green' size="40" />

                <VStack alignItems="initial">
                    <Text fontSize="xl" color="gray">Entradas</Text>

                    <Text fontSize="2xl" fontWeight="semibold" color="green">+ {formatValue(ganhos)}</Text>
                </VStack>                
            </HStack>

            <HStack background="white" padding="8" borderRadius="8" flex={1} spacing="6">
                <AiOutlineArrowDown color='red' size="40" />

                <VStack alignItems="initial">
                    <Text fontSize="xl" color="gray">Saidas</Text>

                    <Text fontSize="2xl" fontWeight="semibold" color="red">- {formatValue(gastos)}</Text>
                </VStack>
            </HStack>

            <HStack background="white" padding="8" borderRadius="8" flex={1} spacing="6">
                <GiTakeMyMoney size="40" />

                <VStack alignItems="initial">
                    <Text fontSize="xl" color="gray">Saldo</Text>

                    <Text fontSize="2xl" fontWeight="semibold">{formatValue(total)}</Text>
                </VStack>
            </HStack>
        </HStack>
    );
}