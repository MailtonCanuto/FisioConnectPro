'use client'

import { useState } from 'react'
import Image from 'next/image'
import Layout from '@/components/layout/Layout'
import { Tab } from '@headlessui/react'
import {
  UserCircleIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  BellIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'
import { FaUpload } from 'react-icons/fa'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const settings = [
  {
    id: 'perfil',
    name: 'Perfil',
    icon: UserCircleIcon,
    fields: [
      { label: 'Nome', type: 'text', value: 'Dr. Silva' },
      { label: 'Email', type: 'email', value: 'dr.silva@example.com' },
      { label: 'Telefone', type: 'tel', value: '(11) 99999-9999' },
      { label: 'Especialidade', type: 'text', value: 'Fisioterapia Ortopédica' },
      { label: 'CREFITO', type: 'text', value: '123456-F' }
    ]
  },
  {
    id: 'clinica',
    name: 'Clínica',
    icon: BuildingOfficeIcon,
    fields: [
      { label: 'Nome da Clínica', type: 'text', value: 'FisioFlow' },
      { label: 'CNPJ', type: 'text', value: '12.345.678/0001-90' },
      { label: 'Endereço', type: 'text', value: 'Rua Exemplo, 123' },
      { label: 'Cidade', type: 'text', value: 'São Paulo' },
      { label: 'Estado', type: 'text', value: 'SP' },
      { label: 'CEP', type: 'text', value: '01234-567' }
    ]
  },
  {
    id: 'pagamentos',
    name: 'Pagamentos',
    icon: CreditCardIcon,
    fields: [
      { label: 'Valor da Sessão', type: 'number', value: '150' },
      { label: 'Taxa de Cancelamento', type: 'number', value: '50' },
      { label: 'Prazo para Cancelamento (horas)', type: 'number', value: '24' }
    ]
  },
  {
    id: 'notificacoes',
    name: 'Notificações',
    icon: BellIcon,
    fields: [
      { label: 'Lembrete de Consulta (horas antes)', type: 'number', value: '24' },
      { label: 'Confirmação por WhatsApp', type: 'checkbox', value: true },
      { label: 'Confirmação por Email', type: 'checkbox', value: true },
      { label: 'Notificar Faltas', type: 'checkbox', value: true }
    ]
  },
  {
    id: 'equipe',
    name: 'Equipe',
    icon: UserGroupIcon,
    fields: [
      { label: 'Permitir Agendamento Online', type: 'checkbox', value: true },
      { label: 'Acesso ao Financeiro', type: 'checkbox', value: false },
      { label: 'Gerenciar Prontuários', type: 'checkbox', value: true }
    ]
  },
  {
    id: 'documentos',
    name: 'Documentos',
    icon: DocumentTextIcon,
    fields: [
      { label: 'Termo de Consentimento', type: 'file', value: null },
      { label: 'Política de Privacidade', type: 'file', value: null },
      { label: 'Contrato de Prestação de Serviços', type: 'file', value: null }
    ]
  }
]

export default function ConfiguracoesPage() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [currentLogo, setCurrentLogo] = useState<string>('/placeholder.png')

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveLogo = async () => {
    if (logoPreview) {
      setCurrentLogo(logoPreview)
      setLogoPreview(null)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>
          <button className="btn-primary">
            Salvar Alterações
          </button>
        </div>

        <div className="bg-white shadow rounded-lg">
          <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <div className="flex">
              <Tab.List className="w-64 border-r border-gray-200 p-4 space-y-1">
                {settings.map((setting) => (
                  <Tab
                    key={setting.id}
                    className={({ selected }) =>
                      classNames(
                        'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md',
                        selected
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )
                    }
                  >
                    <setting.icon className="h-5 w-5 mr-3" />
                    {setting.name}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="flex-1 p-6">
                {settings.map((setting) => (
                  <Tab.Panel key={setting.id}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">{setting.name}</h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Gerencie suas configurações de {setting.name.toLowerCase()}.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {setting.fields.map((field) => (
                          <div key={field.label}>
                            <label className="block text-sm font-medium text-gray-700">
                              {field.label}
                            </label>
                            {field.type === 'checkbox' ? (
                              <div className="mt-1">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                  defaultChecked={field.value as boolean}
                                />
                              </div>
                            ) : field.type === 'file' ? (
                              <div className="mt-1">
                                <input
                                  type="file"
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100"
                                />
                              </div>
                            ) : (
                              <input
                                type={field.type}
                                className="mt-1 input"
                                defaultValue={field.value as string}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>

        {/* Seção de Logo */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Logo da Empresa</h2>
          
          <div className="space-y-4">
            {/* Preview da Logo Atual */}
            <div className="flex items-center space-x-6">
              <div className="w-40 h-40 relative border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Logo da Empresa"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <BuildingOffice2Icon className="w-20 h-20" />
                    <span className="text-sm mt-2">Sem logo</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Esta logo será exibida no topo da barra lateral do sistema.
                  Recomendamos uma imagem de pelo menos 200x200 pixels.
                </p>
                <div className="flex space-x-4">
                  <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <FaUpload className="h-4 w-4 mr-2" />
                    Escolher arquivo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </label>
                  {logoPreview && (
                    <button
                      onClick={handleSaveLogo}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Salvar alterações
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Recomendações */}
            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Recomendações:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Formato: PNG ou JPG</li>
                <li>• Tamanho máximo: 2MB</li>
                <li>• Dimensões mínimas: 200x200 pixels</li>
                <li>• Fundo transparente (PNG) para melhor integração</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 