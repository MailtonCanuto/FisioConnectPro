'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Calendar } from '@/components/Calendar'
import { PlusIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

interface Appointment {
  id: string
  patientId: string
  patientName: string
  date: string
  time: string
  duration: number
  type: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

// Dados de exemplo - serão substituídos por dados do backend
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'João Silva',
    date: '2024-04-23',
    time: '09:00',
    duration: 60,
    type: 'Avaliação',
    status: 'scheduled',
    notes: 'Primeira consulta'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Maria Santos',
    date: '2024-04-23',
    time: '10:30',
    duration: 45,
    type: 'Retorno',
    status: 'scheduled'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Pedro Oliveira',
    date: '2024-04-23',
    time: '14:00',
    duration: 60,
    type: 'Tratamento',
    status: 'scheduled'
  }
]

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const appointmentsForSelectedDate = mockAppointments.filter(
    appointment => appointment.date === selectedDate.toISOString().split('T')[0]
  ).sort((a, b) => a.time.localeCompare(b.time))

  return (
    <Layout>
      <div className="h-[calc(100vh-64px)] flex">
        {/* Calendário */}
        <div className="w-96 border-r border-gray-200 bg-white p-4">
          <div className="mb-4">
            <button className="btn-primary w-full flex items-center justify-center">
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Consulta
            </button>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </div>

        {/* Lista de consultas */}
        <div className="flex-1 bg-gray-50">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Consultas para {selectedDate.toLocaleDateString('pt-BR')}
            </h2>

            <div className="space-y-4">
              {appointmentsForSelectedDate.length > 0 ? (
                appointmentsForSelectedDate.map(appointment => (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${
                          appointment.status === 'completed' ? 'bg-green-500' :
                          appointment.status === 'cancelled' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {appointment.patientName}
                          </h3>
                          <div className="text-sm text-gray-500 space-y-1">
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {appointment.time} - {appointment.duration} min
                            </div>
                            <div className="flex items-center">
                              <UserIcon className="h-4 w-4 mr-1" />
                              {appointment.type}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn-secondary">Editar</button>
                        <button className="btn-primary">
                          Iniciar
                        </button>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-2 text-sm text-gray-500 border-t pt-2">
                        {appointment.notes}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Nenhuma consulta agendada para esta data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 