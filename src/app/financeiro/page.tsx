'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { 
  BanknotesIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import type { FinancialTransaction } from '@/types'

// Dados de exemplo - serão substituídos por dados do backend
const mockTransactions: FinancialTransaction[] = [
  {
    id: '1',
    date: '2024-04-22',
    description: 'Pagamento de Sessão',
    amount: 100,
    type: 'income',
    status: 'paid',
    category: 'Sessão',
    patientId: '1'
  },
  {
    id: '2',
    date: '2024-04-21',
    description: 'Equipamento de Exercício',
    amount: 200,
    type: 'expense',
    status: 'pending',
    category: 'Equipamento'
  },
  {
    id: '3',
    date: '2024-04-20',
    description: 'Pagamento de Sessão',
    amount: 50,
    type: 'income',
    status: 'overdue',
    category: 'Sessão',
    patientId: '2'
  },
  {
    id: '4',
    date: '2024-04-18',
    description: 'Pagamento de Sessão',
    amount: 500,
    type: 'income',
    status: 'paid',
    category: 'Sessão',
    patientId: '3'
  }
]

const stats = [
  {
    name: 'A Receber',
    value: 'R$ 3.200',
    icon: BanknotesIcon,
    change: '+4.75%',
    changeType: 'positive'
  },
  {
    name: 'Recebido',
    value: 'R$ 7.500',
    icon: ArrowTrendingUpIcon,
    change: '+54.02%',
    changeType: 'positive'
  },
  {
    name: 'Em Atraso',
    value: 'R$ 1.200',
    icon: ClockIcon,
    change: '-1.39%',
    changeType: 'negative'
  }
]

export default function FinanceiroPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all')
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    const matchesType = filterType === 'all' || transaction.type === filterType
    return matchesStatus && matchesType
  })

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Financeiro</h1>
          <button className="btn-primary">
            Nova Transação
          </button>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span
                    className={`font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>{' '}
                  <span className="text-gray-500">vs. mês anterior</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filtros e tabela */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex gap-4 mb-6">
              <select
                className="input w-48"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'paid' | 'pending' | 'overdue')}
              >
                <option value="all">Todos os status</option>
                <option value="paid">Pago</option>
                <option value="pending">Pendente</option>
                <option value="overdue">Em atraso</option>
              </select>
              <select
                className="input w-48"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
              >
                <option value="all">Todos os tipos</option>
                <option value="income">Receitas</option>
                <option value="expense">Despesas</option>
              </select>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'income' ? '+' : '-'}
                        R$ {transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.status === 'paid'
                          ? 'Pago'
                          : transaction.status === 'pending'
                          ? 'Pendente'
                          : 'Em atraso'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
} 