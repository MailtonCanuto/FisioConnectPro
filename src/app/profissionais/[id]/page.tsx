'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Tab } from '@headlessui/react'
import { 
  UserIcon, 
  CalendarIcon, 
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

// Dados de exemplo - serão substituídos por dados do backend
const mockProfissional = {
  id: '1',
  nome: 'Dra. Ana Oliveira',
  especialidade: 'Fisioterapia Ortopédica',
  registro: 'CREFITO-12345',
  email: 'ana.oliveira@clinica.com',
  telefone: '(11) 99999-9999',
  endereco: 'Rua das Flores, 123 - São Paulo/SP',
  formacao: [
    {
      curso: 'Fisioterapia',
      instituicao: 'Universidade de São Paulo',
      anoConclusao: '2010'
    },
    {
      curso: 'Especialização em Fisioterapia Ortopédica',
      instituicao: 'Instituto de Ortopedia e Traumatologia',
      anoConclusao: '2012'
    }
  ],
  experiencia: [
    {
      cargo: 'Fisioterapeuta',
      empresa: 'Clínica Ortopédica São Paulo',
      periodo: '2012 - 2015'
    },
    {
      cargo: 'Fisioterapeuta Sênior',
      empresa: 'Hospital das Clínicas',
      periodo: '2015 - 2020'
    }
  ],
  certificacoes: [
    {
      nome: 'Terapia Manual Avançada',
      instituicao: 'Associação Brasileira de Fisioterapia',
      ano: '2013'
    },
    {
      nome: 'Pilates Clínico',
      instituicao: 'Escola Brasileira de Pilates',
      ano: '2014'
    }
  ],
  documentos: [
    {
      id: '1',
      nome: 'Diploma de Graduação',
      data: '2010-12-15',
      tipo: 'PDF'
    },
    {
      id: '2',
      nome: 'Certificado de Especialização',
      data: '2012-06-20',
      tipo: 'PDF'
    }
  ]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfissionalDetalhesPage({ params }: { params: { id: string } }) {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/profissionais" className="text-gray-600 hover:text-gray-900">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Profissional</h1>
          </div>
          <button className="btn-primary flex items-center">
            <PencilIcon className="h-5 w-5 mr-2" />
            Editar
          </button>
        </div>

        {/* Informações do Profissional */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{mockProfissional.nome}</p>
                    <p className="text-sm text-gray-500">{mockProfissional.especialidade}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-900">{mockProfissional.telefone}</p>
                    <p className="text-sm text-gray-500">{mockProfissional.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">{mockProfissional.endereco}</p>
                  <p className="text-sm text-gray-500">Registro: {mockProfissional.registro}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Abas do Profissional */}
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
                  Formação
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
                <div className="space-y-8">
                  {/* Formação */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Formação Acadêmica</h3>
                    <div className="space-y-4">
                      {mockProfissional.formacao.map((formacao, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                          <p className="text-sm font-medium text-gray-900">{formacao.curso}</p>
                          <p className="text-sm text-gray-500">{formacao.instituicao}</p>
                          <p className="text-sm text-gray-500">Conclusão: {formacao.anoConclusao}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experiência */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Experiência Profissional</h3>
                    <div className="space-y-4">
                      {mockProfissional.experiencia.map((exp, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                          <p className="text-sm font-medium text-gray-900">{exp.cargo}</p>
                          <p className="text-sm text-gray-500">{exp.empresa}</p>
                          <p className="text-sm text-gray-500">{exp.periodo}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certificações */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Certificações</h3>
                    <div className="space-y-4">
                      {mockProfissional.certificacoes.map((cert, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                          <p className="text-sm font-medium text-gray-900">{cert.nome}</p>
                          <p className="text-sm text-gray-500">{cert.instituicao}</p>
                          <p className="text-sm text-gray-500">Ano: {cert.ano}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel className="p-6">
                <div className="space-y-4">
                  {mockProfissional.documentos.map((documento) => (
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