'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  CalendarIcon, 
  UserGroupIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Painel Geral', href: '/', icon: HomeIcon },
  { name: 'Agenda', href: '/agenda', icon: CalendarIcon },
  { name: 'Profissionais', href: '/profissionais', icon: UserGroupIcon },
  { name: 'Pacientes', href: '/pacientes', icon: UserIcon },
  { name: 'Prontuário', href: '/prontuario', icon: ClipboardDocumentListIcon },
  { name: 'Financeiro', href: '/financeiro', icon: CurrencyDollarIcon },
  { name: 'Relatórios', href: '/relatorios', icon: ChartBarIcon },
  { name: 'Mensagens', href: '/mensagens', icon: ChatBubbleLeftIcon },
  { name: 'Configurações', href: '/configuracoes', icon: Cog6ToothIcon },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      <div className="flex-shrink-0 px-4 py-6 flex flex-col items-center border-b border-gray-200">
        <div className="w-40 h-40 relative mb-3 bg-gray-50 rounded-lg flex items-center justify-center">
          <BuildingOffice2Icon className="w-24 h-24 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">MG FISIOTERAPIA</h2>
        <p className="text-sm text-gray-500 mt-1">Reabilitando Vidas</p>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-6 w-6 ${
                  isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 