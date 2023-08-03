import {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'

export type TransacoesFinanceiras = {
    id: number
    titulo: string
    categoria: string
    status: 'Entrada' | 'Saida'
    valor: number
    data: Date
    formaPagamento?: string
}

type TransacaoesFinanceirasContextValue = {
    transacoesFinanceiras: TransacoesFinanceiras[]
    categorias: string[]
    formasPagamento: string[]
    addTransacaoFinanceira: (novaTransacao: TransacoesFinanceiras) => void
    updateTransacaoFinanceira: (transacao: TransacoesFinanceiras, id: number) => void
    deleteTransacaoFinanceira: (id: number) => void
}

interface Props {
    children: React.ReactNode
}

export const TransacoesFinanceirasContext = createContext({} as TransacaoesFinanceirasContextValue)

export const TransacoesFinanceirasProvider: FC<Props> = function TransacoesFinanceirasProvider({ children }) {

    const [transacoesFinanceiras, setTransacoesFinanceiras] = useState<TransacoesFinanceiras[]>([])

    const categorias = [
        'Alimentacao', 
        'Educacao', 
        'Gastos pessoais', 
        'Lazer', 
        'Outros', 
        'Saúde', 
        'Servicos',
        'Tarifas e impostos', 
        'Transporte'
    ]

    const formasPagamento = [
        'Cartão de crédito',
        'Cartão de débito',
        'Dinheiro',
        'Pix',
    ]

    useEffect(() => {
        const initialValuesTransacaoFinanceira: TransacoesFinanceiras[] = [
            {
                id: Math.random(),
                titulo: 'Salário',
                status: 'Entrada',
                categoria: 'Servicos',
                data: new Date('01/01/2023'),
                valor: 100,
            },
            {
                id: Math.random(),
                titulo: 'Consulta Médica',
                status: 'Saida',
                categoria: 'Saúde',
                data: new Date('02/02/2023'),
                valor: 10.90,
                formaPagamento:'Cartão de crédito',
            },
            {
                id: Math.random(),
                titulo: 'Pizza',
                status: 'Saida',
                categoria: 'Alimentacao',
                data: new Date('03/03/2023'),
                valor: 31.90,
                formaPagamento: 'Pix',
            },
        ]

        const storageTransacoesFinanceiras = window.localStorage.getItem('transacoesFinanceiras')

        if (!storageTransacoesFinanceiras) {
            setTransacoesFinanceiras(initialValuesTransacaoFinanceira)
            window.localStorage.setItem('transacoesFinanceiras', JSON.stringify(initialValuesTransacaoFinanceira))
        } else {
            setTransacoesFinanceiras(JSON.parse(storageTransacoesFinanceiras))
        }

    }, [])

    const addTransacaoFinanceira = useCallback(
        (novaTransacao: TransacoesFinanceiras) => {
            const newValue = [...transacoesFinanceiras, novaTransacao]
            setTransacoesFinanceiras(newValue)
            window.localStorage.setItem('transacoesFinanceiras', JSON.stringify(newValue))
        },
        [transacoesFinanceiras],
    )

    const updateTransacaoFinanceira = useCallback(
        (transacao: TransacoesFinanceiras, id: number) => {
            const updatedValue = transacoesFinanceiras.map(transaction => transaction.id === id ? transacao : transaction)
            setTransacoesFinanceiras(updatedValue)
            window.localStorage.setItem('transacoesFinanceiras', JSON.stringify(updatedValue))
        },
        [transacoesFinanceiras],
    )
    
    const deleteTransacaoFinanceira = useCallback(
        (id: number) => {
            const newValue = transacoesFinanceiras.filter(transaction => transaction.id !== id)
            setTransacoesFinanceiras(newValue)
            window.localStorage.setItem('transacoesFinanceiras', JSON.stringify(newValue))
        },
        [transacoesFinanceiras],
    )

    return (
        <TransacoesFinanceirasContext.Provider value={{ categorias, transacoesFinanceiras, formasPagamento, updateTransacaoFinanceira, addTransacaoFinanceira, deleteTransacaoFinanceira }}>
            {children}
        </TransacoesFinanceirasContext.Provider>
    )
}

export function useTransacoesFinanceiras() {
    return useContext(TransacoesFinanceirasContext)
}
