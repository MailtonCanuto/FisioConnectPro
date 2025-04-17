'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Tab } from '@headlessui/react'
import {
  ChartBarIcon,
  UsersIcon,
  BanknotesIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const reports = [
  {
    id: 'atendimentos',
    name: 'Atendimentos',
    icon: CalendarIcon,
    description: 'Análise detalhada dos atendimentos realizados, faltas e cancelamentos.',
    metrics: [
      { name: 'Total de Atendimentos', value: '245', change: '+12.3%', changeType: 'positive' },
      { name: 'Taxa de Faltas', value: '8%', change: '-2.1%', changeType: 'positive' },
      { name: 'Média Diária', value: '12', change: '+3.2%', changeType: 'positive' }
    ]
  },
  {
    id: 'pacientes',
    name: 'Pacientes',
    icon: UsersIcon,
    description: 'Informações sobre novos pacientes, retenção e satisfação.',
    metrics: [
      { name: 'Novos Pacientes', value: '32', change: '+24.5%', changeType: 'positive' },
      { name: 'Taxa de Retenção', value: '85%', change: '+5.2%', changeType: 'positive' },
      { name: 'NPS', value: '8.7', change: '+0.3', changeType: 'positive' }
    ]
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    icon: BanknotesIcon,
    description: 'Análise de receitas, despesas e indicadores financeiros.',
    metrics: [
      { name: 'Receita Total', value: 'R$ 45.750', change: '+18.2%', changeType: 'positive' },
      { name: 'Ticket Médio', value: 'R$ 187', change: '+5.8%', changeType: 'positive' },
      { name: 'Taxa de Inadimplência', value: '3.2%', change: '-1.4%', changeType: 'positive' }
    ]
  },
  {
    id: 'desempenho',
    name: 'Desempenho',
    icon: ChartBarIcon,
    description: 'Métricas de produtividade e eficiência operacional.',
    metrics: [
      { name: 'Taxa de Ocupação', value: '82%', change: '+7.5%', changeType: 'positive' },
      { name: 'Satisfação', value: '4.8/5.0', change: '+0.2', changeType: 'positive' },
      { name: 'Tempo Médio', value: '45min', change: '-5min', changeType: 'positive' }
    ]
  }
]

export default function RelatoriosPage() {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Relatórios</h1>
          <div className="flex gap-4">
            <select className="input w-48">
              <option>Últimos 30 dias</option>
              <option>Este mês</option>
              <option>Último mês</option>
              <option>Este ano</option>
              <option>Personalizado</option>
            </select>
            <button className="btn-primary">
              Exportar
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Tab.List className="flex border-b border-gray-200">
              {reports.map((report) => (
                <Tab
                  key={report.id}
                  className={({ selected }) =>
                    classNames(
                      'flex items-center px-6 py-3 text-sm font-medium',
                      selected
                        ? 'border-b-2 border-primary-500 text-primary-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )
                  }
                >
                  <report.icon className="h-5 w-5 mr-2" />
                  {report.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {reports.map((report) => (
                <Tab.Panel key={report.id} className="p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900">{report.name}</h2>
                    <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {report.metrics.map((metric) => (
                      <div key={metric.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                  {metric.name}
                                </dt>
                                <dd className="flex items-baseline">
                                  <div className="text-2xl font-semibold text-gray-900">
                                    {metric.value}
                                  </div>
                                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {metric.change}
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                    <div className="text-center text-sm text-gray-500">
                      Gráfico detalhado será implementado aqui
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Layout>
  )
} 