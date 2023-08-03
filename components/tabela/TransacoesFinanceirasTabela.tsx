import React, { useEffect, useState } from 'react';
import { 
    Table,
    Thead, 
    Tr, 
    Th, 
    Tbody,
    Td, 
    IconButton, 
    useDisclosure, 
    Button, 
    Badge, 
    HStack, 
    Text, 
    VStack, 
    Select,
    Alert, 
    AlertIcon,
} from '@chakra-ui/react'
import { RiAddFill } from 'react-icons/ri'
import {AiOutlineEdit, AiFillDelete} from 'react-icons/ai'
import { TransacoesFinanceiras, useTransacoesFinanceiras } from '../../context/TransacoesFinanceirasContext';
import {TransacaoFinanceiraModalUpdate} from '../modal';
import formatValue from '../../utils/formatValue';

export default function TransacoesFinanceirasTabela() {    
    const { categorias, transacoesFinanceiras, formasPagamento, deleteTransacaoFinanceira } = useTransacoesFinanceiras()
    const [ transacaoFinanceiraUpdate, setTransacaoFinanceiraUpdate ] = useState<TransacoesFinanceiras | undefined>()
    const [ transacoesFinanceirasList, setTransacoesFinanceirasList ] = useState<TransacoesFinanceiras[]>(transacoesFinanceiras)

    const {
        isOpen: isOpenUpdate,
        onOpen: onOpenUpdate,
        onClose: onCloseUpdate,
    } = useDisclosure()

    const updateTransacao = (transacaoFinanceira: TransacoesFinanceiras) => {
        setTransacaoFinanceiraUpdate(transacaoFinanceira)
        onOpenUpdate()
    }
    
    const adicionaTransacao = () => {
        setTransacaoFinanceiraUpdate(undefined)
        onOpenUpdate()
    }

    const handleFiltrarCategoria = (categoria: string) => {
        if(!categoria) return

        if (categoria === "all") setTransacoesFinanceirasList(transacoesFinanceiras)
        else {
            setTransacoesFinanceirasList(transacoesFinanceiras.filter(transacao => transacao.categoria === categoria ))
        }        
    }

    const handleFiltrarFormaPagamento = (formaPagamento: string) => {
        if(!formaPagamento) return

        if (formaPagamento === "all") setTransacoesFinanceirasList(transacoesFinanceiras)
        else {
            setTransacoesFinanceirasList(transacoesFinanceiras.filter(transacao => transacao.formaPagamento === formaPagamento ))
        }        
    }

    const handleFiltrarStatus = (status: string) => {
        if(!status) return

        if (status === "all") setTransacoesFinanceirasList(transacoesFinanceiras)
        else {
            setTransacoesFinanceirasList(transacoesFinanceiras.filter(transacao => transacao.status === status ))
        }        
    }

    useEffect(() => {
        setTransacoesFinanceirasList(transacoesFinanceiras)
    }, [transacoesFinanceiras])

    return (
        <VStack 
            width="full"
            background="white" 
            paddingX="4"
            paddingY="8"
            borderRadius="4"
            spacing="8"
        >
            <HStack justifyContent="space-between" w="full">
                <Text fontSize='2xl' fontWeight="semibold">Últimas transações</Text>
            </HStack>

            <HStack spacing="5">                    
                <Select 
                    w="auto" 
                    placeholder='Filtrar por tipo de transação' 
                    onChange={e => handleFiltrarStatus(e.target.value)}
                >
                    <option value="all">Todos</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Saida">Saida</option>
                </Select>

                <Select 
                    w="auto" 
                    placeholder='Filtrar por categoria' 
                    onChange={e => handleFiltrarCategoria(e.target.value)}
                >
                    <option value="all">Todas as categorias</option>
                    {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </Select>

                <Select 
                    w="auto" 
                    placeholder='Filtrar por forma de pagamento' 
                    onChange={e => handleFiltrarFormaPagamento(e.target.value)}
                >
                    <option value="all">Todas as formas de pagamento</option>
                    {formasPagamento.map(formaPagamento => (
                        <option key={formaPagamento} value={formaPagamento}>{formaPagamento}</option>
                    ))}
                </Select>

                <Button
                    onClick={adicionaTransacao}
                    leftIcon={<RiAddFill size={22}/>} 
                    colorScheme='messenger' 
                    variant='solid'
                >
                    Nova transacao
                </Button> 
            </HStack>
            
            {transacoesFinanceiras.length === 0 &&
                <Alert status='info'>
                    <AlertIcon />
                    Ainda não há transações financeiras cadastradas.
                </Alert>
            }

            {transacoesFinanceirasList.length > 0 &&                        
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Descrição</Th>
                            <Th>Data</Th>
                            <Th>Categoria</Th>
                            <Th>Tipo</Th>
                            <Th>Valor</Th>
                            <Th>Forma pagamento</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {transacoesFinanceirasList.map(transacaoFinanceira => (
                            <Tr key={transacaoFinanceira.id}>
                                <Td>{transacaoFinanceira.titulo}</Td>
                                <Td>{new Date(transacaoFinanceira.data).toLocaleDateString('pt-BR')}</Td>
                                <Td>{transacaoFinanceira.categoria}</Td>
                                <Td>
                                    {transacaoFinanceira.status === 'Entrada' ? (
                                        <Badge colorScheme='green'>Entrada</Badge>
                                        ) : (
                                        <Badge colorScheme='red'>Saida</Badge>
                                    )}
                                </Td>
                                <Td>{formatValue(transacaoFinanceira.valor)}</Td>
                                <Td>{transacaoFinanceira.status === 'Entrada' ? '-' : transacaoFinanceira.formaPagamento}</Td>
                                <Td>
                                    <IconButton 
                                        onClick={() => updateTransacao(transacaoFinanceira)} 
                                        aria-label='Editar transacao' 
                                        icon={<AiOutlineEdit />} 
                                        isRound 
                                        marginRight={2} 
                                    />
                                    <IconButton 
                                        onClick={() => deleteTransacaoFinanceira(transacaoFinanceira.id)} 
                                        aria-label='Excluir transacao' 
                                        icon={<AiFillDelete color='red' />} 
                                        isRound 
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            }

            <TransacaoFinanceiraModalUpdate
                transacaoFinanceira={transacaoFinanceiraUpdate}
                {...(transacaoFinanceiraUpdate && { key: transacaoFinanceiraUpdate.id })}
                isOpen={isOpenUpdate}
                onClose={onCloseUpdate}
            />
        </VStack>
    );
}