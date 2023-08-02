import { Button, DrawerProps, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TransacoesFinanceiras, useTransacoesFinanceiras } from '../../context/TransacoesFinanceirasContext';

type TransacaoFinanceiraModalUpdateProps = Omit<DrawerProps, 'children'> & {
    transacaoFinanceira: TransacoesFinanceiras | undefined;
};

type TransacaoFinanceiraForm =  {
    titulo: string;
    categoria: string;
    status: 'Entrada' | 'Saida';
    valor: string;
};

export default function TransacaoFinanceiraModalUpdate({ 
    isOpen, 
    onClose,
    transacaoFinanceira,
    ...props 
}: TransacaoFinanceiraModalUpdateProps) {
    const { categorias, updateTransacaoFinanceira, addTransacaoFinanceira } = useTransacoesFinanceiras();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TransacaoFinanceiraForm>({ mode: 'onTouched' });

    const handleGravaTransacao = (data: TransacaoFinanceiraForm) => {
        const { titulo, valor, status, categoria } = data;
        const formatedValue = parseFloat(valor);
        
        if ( transacaoFinanceira ) {
            updateTransacaoFinanceira({...transacaoFinanceira, titulo, valor: formatedValue, status, categoria}, transacaoFinanceira.id);
        } else {
            addTransacaoFinanceira({ data: new Date(), titulo, valor: formatedValue, categoria, status, id: Math.random()})
        }

        onClose();
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