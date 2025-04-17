'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Tab } from '@headlessui/react'
import { 
  UserIcon, 
  CalendarIcon, 
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  ArrowLeftIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

// Dados de exemplo - serão substituídos por dados do backend
const mockProntuario = {
  id: '1',
  paciente: 'João Silva',
  dataNascimento: '1980-03-15',
  telefone: '(11) 99999-9999',
  email: 'joao.silva@email.com',
  endereco: 'Rua das Flores, 123 - São Paulo/SP',
  profissao: 'Engenheiro',
  avaliacao: {
    queixaPrincipal: 'Dor lombar intensa com irradiação para membro inferior direito',
    historicoDoenca: 'Início há 3 meses após carregar peso excessivo no trabalho',
    medicamentos: 'Anti-inflamatório prescrito pelo ortopedista',
    exames: 'Ressonância magnética mostrando protrusão discal L4-L5',
    dor: {
      localizacao: 'Região lombar e face posterior da coxa direita',
      intensidade: 8,
      caracteristica: 'Queimação e pontada',
      fatoresAgravantes: 'Movimentos de flexão e carregar peso',
      fatoresAtenuantes: 'Repouso e medicação'
    },
    exameFisico: {
      inspecao: 'Postura antálgica com inclinação lateral do tronco',
      palpacao: 'Dor à palpação na região lombar baixa',
      amplitudeMovimento: 'Flexão: 30°, Extensão: 10°, Rotação: 50%',
      forcaMuscular: 'MMII: 4/5, MMSS: 5/5',
      testesEspeciais: 'Lasègue positivo à direita',
      sensibilidade: 'Hipoestesia em L5 à direita'
    },
    objetivos: [
      'Reduzir dor para 3/10',
      'Melhorar amplitude de movimento',
      'Fortalecer musculatura lombar',
      'Orientar sobre ergonomia'
    ],
    planoTratamento: [
      'Eletroterapia analgésica',
      'Exercícios de fortalecimento',
      'Alongamentos',
      'Orientações posturais'
    ]
  },
  historico: [
    {
      id: '1',
      data: '2024-04-23',
      tipo: 'evolucao',
      descricao: 'Paciente relata melhora significativa da dor lombar após 4 sessões de fisioterapia. Realizou exercícios de fortalecimento e alongamento conforme prescrito.',
      profissional: 'Dra. Ana Oliveira'
    },
    {
      id: '2',
      data: '2024-04-16',
      tipo: 'evolucao',
      descricao: 'Iniciado protocolo de exercícios para fortalecimento da musculatura lombar. Paciente apresentou boa adesão ao tratamento.',
      profissional: 'Dra. Ana Oliveira'
    },
    {
      id: '3',
      data: '2024-04-09',
      tipo: 'avaliacao',
      descricao: 'Avaliação inicial: Paciente apresenta dor lombar crônica com irradiação para membro inferior direito. Força muscular reduzida e amplitude de movimento limitada.',
      profissional: 'Dra. Ana Oliveira'
    }
  ],
  documentos: [
    {
      id: '1',
      nome: 'Laudo Médico',
      data: '2024-04-08',
      tipo: 'PDF'
    },
    {
      id: '2',
      nome: 'Exame de Ressonância',
      data: '2024-04-07',
      tipo: 'PDF'
    }
  ]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProntuarioDetalhesPage({ params }: { params: { id: string } }) {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/prontuario" className="text-gray-600 hover:text-gray-900">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Prontuário</h1>
          </div>
          <button className="btn-primary flex items-center">
            <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
            Nova Evolução
          </button>
        </div>

        {/* Informações do Paciente */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{mockProntuario.paciente}</p>
                    <p className="text-sm text-gray-500">
                      Nascimento: {new Date(mockProntuario.dataNascimento).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-900">{mockProntuario.telefone}</p>
                    <p className="text-sm text-gray-500">{mockProntuario.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">{mockProntuario.endereco}</p>
                  <p className="text-sm text-gray-500">Profissão: {mockProntuario.profissao}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Abas do Prontuário */}
        <div className="bg-white shadow-sm rounded-lg">
          <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Tab.List className="flex border-b border-gray-200">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'px-6 py-3 text-sm font-medium',
                    selected
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )
                }
              >
                <div className="flex items-center">
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                  Histórico
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'px-6 py-3 text-sm font-medium',
                    selected
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )
                }
              >
                <div className="flex items-center">
                  <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                  Avaliação
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'px-6 py-3 text-sm font-medium',
                    selected
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )
                }
              >
                <div className="flex items-center">
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Documentos
                </div>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="p-6">
                <div className="space-y-6">
                  {mockProntuario.historico.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(item.data).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-sm text-gray-500">{item.profissional}</div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.tipo === 'avaliacao' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.tipo === 'avaliacao' ? 'Avaliação' : 'Evolução'}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {item.descricao}
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
              <Tab.Panel className="p-6">
                <div className="space-y-8">
                  {/* Queixa Principal */}
                  <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Queixa Principal</h3>
                    <p className="text-gray-600">{mockProntuario.avaliacao.queixaPrincipal}</p>
                  </div>

                  {/* Histórico da Doença */}
                  <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico da Doença</h3>
                    <p className="text-gray-600">{mockProntuario.avaliacao.historicoDoenca}</p>
                  </div>

                  {/* Medicamentos e Exames */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Medicamentos</h3>
                      <p className="text-gray-600">{mockProntuario.avaliacao.medicamentos}</p>
                    </div>
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Exames</h3>
                      <p className="text-gray-600">{mockProntuario.avaliacao.exames}</p>
                    </div>
                  </div>

                  {/* Avaliação da Dor */}
                  <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Avaliação da Dor</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Localização</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.dor.localizacao}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Intensidade</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-primary-600 h-2.5 rounded-full" 
                              style={{ width: `${(mockProntuario.avaliacao.dor.intensidade / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{mockProntuario.avaliacao.dor.intensidade}/10</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Característica</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.dor.caracteristica}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Fatores Agravantes</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.dor.fatoresAgravantes}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Fatores Atenuantes</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.dor.fatoresAtenuantes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Exame Físico */}
                  <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Exame Físico</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Inspeção</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.exameFisico.inspecao}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Palpação</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.exameFisico.palpacao}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Amplitude de Movimento</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.exameFisico.amplitudeMovimento}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Força Muscular</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.exameFisico.forcaMuscular}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Testes Especiais</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.exameFisico.testesEspeciais}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Sensibilidade</p>
                        <p className="text-gray-600">{mockProntuario.avaliacao.exameFisico.sensibilidade}</p>
                      </div>
                    </div>
                  </div>

                  {/* Objetivos e Plano de Tratamento */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Objetivos</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {mockProntuario.avaliacao.objetivos.map((objetivo, index) => (
                          <li key={index} className="text-gray-600">{objetivo}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Plano de Tratamento</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {mockProntuario.avaliacao.planoTratamento.map((plano, index) => (
                          <li key={index} className="text-gray-600">{plano}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel className="p-6">
                <div className="space-y-4">
                  {mockProntuario.documentos.map((documento) => (
                    <div key={documento.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{documento.nome}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(documento.data).toLocaleDateString('pt-BR')} - {documento.tipo}
                        </p>
                      </div>
                      <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                        Visualizar
                      </button>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Layout>
  )
} 