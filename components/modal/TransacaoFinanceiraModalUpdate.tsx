import React, {useState, useEffect} from 'react'
import { Button, DrawerProps, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { TransacoesFinanceiras, useTransacoesFinanceiras } from '../../context/TransacoesFinanceirasContext'

type TransacaoFinanceiraModalUpdateProps = Omit<DrawerProps, 'children'> & {
    transacaoFinanceira: TransacoesFinanceiras | undefined
}

type TransacaoFinanceiraForm =  {
    titulo: string
    categoria: string
    status: 'Entrada' | 'Saida'
    valor: string
    formaPagamento: string
}

export default function TransacaoFinanceiraModalUpdate({ 
    isOpen, 
    onClose,
    transacaoFinanceira,
    ...props 
}: TransacaoFinanceiraModalUpdateProps) {
    const { categorias, formasPagamento, updateTransacaoFinanceira, addTransacaoFinanceira } = useTransacoesFinanceiras()
    const { register, handleSubmit, watch } = useForm<TransacaoFinanceiraForm>({ mode: 'onTouched' })
    const [isSaida, setIsSaida] = useState<boolean>(false)

    const statusWatch = watch('status')

    useEffect(()=> {
        setIsSaida(statusWatch==='Saida')        
    },[statusWatch])

    const handleGravaTransacao = (data: TransacaoFinanceiraForm) => {
        const { titulo, valor, status, categoria, formaPagamento } = data
        const formatedValue = parseFloat(valor)
        
        if ( transacaoFinanceira ) {
            updateTransacaoFinanceira({...transacaoFinanceira, titulo, valor: formatedValue, status, categoria, formaPagamento}, transacaoFinanceira.id)
        } else {
            addTransacaoFinanceira({ data: new Date(), titulo, valor: formatedValue, categoria, status, formaPagamento, id: Math.random()})
        }
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(handleGravaTransacao)}>
                <ModalHeader>{transacaoFinanceira ? 'Alterar transacao' : 'Adicionar nova transacao' }</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isRequired>
                        <FormLabel>Titulo</FormLabel>
                        <Input 
                            placeholder='Titulo' 
                            {...register('titulo', {
                                required: 'Campo obrigatório.',
                            })}
                            {...(transacaoFinanceira && { defaultValue: transacaoFinanceira.titulo })} 
                        />
                    </FormControl>
        
                    <FormControl mt={4} isRequired>
                        <FormLabel>Tipo</FormLabel>
                        <Select 
                            isRequired
                            {...register('status', {
                                required: 'Campo obrigatório.',
                            })}
                            {...(transacaoFinanceira && { defaultValue: transacaoFinanceira?.status })}
                        >
                            <option value='Entrada'>Entrada</option>
                            <option value='Saida'>Saida</option>
                        </Select>
                    </FormControl>
        
                    {isSaida && 
                        <FormControl mt={4} isRequired>
                            <FormLabel>Forma de pagamento</FormLabel>
                            <Select 
                                isRequired
                                {...register('formaPagamento', {
                                    required: 'Campo obrigatório.',
                                })}
                                {...(transacaoFinanceira && { defaultValue: transacaoFinanceira?.status })}
                            >
                                {formasPagamento.map(formaPagamento => (
                                    <option key={formaPagamento} value={formaPagamento}>{formaPagamento}</option>
                                ))}                                
                            </Select>
                        </FormControl>
                    }

                    <FormControl mt={4} isRequired>
                        <FormLabel>Categoria</FormLabel>
                        <Select 
                            isRequired
                            {...register('categoria', {
                                required: 'Campo obrigatório.',
                            })}
                            {...(transacaoFinanceira && { defaultValue: transacaoFinanceira.categoria })}
                        >
                            {categorias.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <FormControl mt={4} isRequired>
                        <FormLabel>Valor</FormLabel>
                        <Input 
                            placeholder='Valor' 
                            {...register('valor', {
                                required: 'Campo obrigatório.',
                            })}
                            {...(transacaoFinanceira && { defaultValue: transacaoFinanceira.valor })} 
                        />
                    </FormControl>
                </ModalBody>
    
                <ModalFooter>
                    <Button onClick={handleSubmit(handleGravaTransacao)} type="submit" colorScheme='blue' mr={3}>
                        Salvar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}