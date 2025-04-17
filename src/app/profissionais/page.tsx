'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

// Dados de exemplo - serão substituídos por dados do backend
const mockProfissionais = [
  {
    id: '1',
    nome: 'Dra. Ana Oliveira',
    especialidade: 'Fisioterapia Ortopédica',
    registro: 'CREFITO-12345',
    email: 'ana.oliveira@clinica.com',
    telefone: '(11) 99999-9999',
    status: 'ativo'
  },
  {
    id: '2',
    nome: 'Dr. Carlos Silva',
    especialidade: 'Fisioterapia Neurológica',
    registro: 'CREFITO-67890',
    email: 'carlos.silva@clinica.com',
    telefone: '(11) 98888-8888',
    status: 'ativo'
  },
  {
    id: '3',
    nome: 'Dra. Mariana Santos',
    especialidade: 'Fisioterapia Respiratória',
    registro: 'CREFITO-54321',
    email: 'mariana.santos@clinica.com',
    telefone: '(11) 97777-7777',
    status: 'inativo'
  }
]

export default function ProfissionaisPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'ativo' | 'inativo'>('all')

  const filteredProfissionais = mockProfissionais.filter(profissional => {
    const matchesSearch = profissional.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profissional.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profissional.registro.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || profissional.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Profissionais</h1>
          <Link href="/profissionais/novo" className="btn-primary flex items-center">
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Novo Profissional
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, especialidade ou registro..."
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
                  Profissional
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
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
              {filteredProfissionais.map((profissional) => (
                <tr key={profissional.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{profissional.nome}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{profissional.especialidade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{profissional.registro}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{profissional.email}</div>
                    <div className="text-sm text-gray-500">{profissional.telefone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      profissional.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {profissional.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      {profissional.status === 'ativo' ? 'Desativar' : 'Ativar'}
                    </button>
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