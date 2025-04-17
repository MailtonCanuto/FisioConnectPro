'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { MagnifyingGlassIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

// Dados de exemplo - serão substituídos por dados do backend
const mockProntuarios = [
  {
    id: '1',
    paciente: 'João Silva',
    dataNascimento: '1980-03-15',
    ultimaConsulta: '2024-04-23',
    status: 'ativo',
    diagnostico: 'Lombalgia crônica',
    tratamento: 'Fisioterapia manual e exercícios'
  },
  {
    id: '2',
    paciente: 'Maria Santos',
    dataNascimento: '1992-10-10',
    ultimaConsulta: '2024-04-22',
    status: 'ativo',
    diagnostico: 'Tendinite de ombro',
    tratamento: 'Eletroterapia e exercícios'
  },
  {
    id: '3',
    paciente: 'Pedro Oliveira',
    dataNascimento: '1988-11-30',
    ultimaConsulta: '2024-04-20',
    status: 'inativo',
    diagnostico: 'Lesão de menisco',
    tratamento: 'Reabilitação pós-cirúrgica'
  }
]

export default function ProntuarioPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'ativo' | 'inativo'>('all')

  const filteredProntuarios = mockProntuarios.filter(prontuario => {
    const matchesSearch = prontuario.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prontuario.diagnostico.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || prontuario.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Prontuários</h1>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome do paciente ou diagnóstico..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="input w-48"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'ativo' | 'inativo')}
          >
            <option value="all">Todos os status</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
          </select>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Nascimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Consulta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnóstico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProntuarios.map((prontuario) => (
                <tr key={prontuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{prontuario.paciente}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(prontuario.dataNascimento).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(prontuario.ultimaConsulta).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{prontuario.diagnostico}</div>
                    <div className="text-sm text-gray-500">{prontuario.tratamento}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      prontuario.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {prontuario.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/prontuario/${prontuario.id}`}
                      className="text-primary-600 hover:text-primary-900 flex items-center"
                    >
                      <DocumentTextIcon className="h-4 w-4 mr-1" />
                      Ver prontuário
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
} 