'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { PaperAirplaneIcon, PlusIcon } from '@heroicons/react/24/outline'

interface Message {
  id: string
  patientId: string
  patientName: string
  content: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  type: 'incoming' | 'outgoing'
}

// Dados de exemplo - serão substituídos por dados do backend
const mockMessages: Message[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Doe',
    content: 'Olá, gostaria de confirmar minha consulta de amanhã às 10h.',
    timestamp: '2024-04-23T14:30:00',
    status: 'read',
    type: 'incoming'
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'John Doe',
    content: 'Sim, sua consulta está confirmada para amanhã às 10h. Aguardamos você!',
    timestamp: '2024-04-23T14:35:00',
    status: 'delivered',
    type: 'outgoing'
  },
  {
    id: '3',
    patientId: '2',
    patientName: 'Jane Smith',
    content: 'Preciso remarcar minha consulta de quinta-feira.',
    timestamp: '2024-04-23T15:00:00',
    status: 'read',
    type: 'incoming'
  }
]

export default function MensagensPage() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const patients = Array.from(new Set(mockMessages.map(msg => ({
    id: msg.patientId,
    name: msg.patientName
  }))))

  const selectedPatientMessages = mockMessages.filter(
    msg => msg.patientId === selectedPatientId
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPatientId) return
    // Aqui seria implementada a lógica de envio da mensagem
    setNewMessage('')
  }

  return (
    <Layout>
      <div className="h-[calc(100vh-64px)] flex">
        {/* Lista de pacientes */}
        <div className="w-80 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <button className="btn-primary w-full flex items-center justify-center">
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Conversa
            </button>
          </div>
          <div className="overflow-y-auto h-full">
            {patients.map(patient => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatientId(patient.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedPatientId === patient.id ? 'bg-primary-50' : ''
                }`}
              >
                <div className="font-medium text-gray-900">{patient.name}</div>
                <div className="text-sm text-gray-500">
                  {mockMessages
                    .filter(msg => msg.patientId === patient.id)
                    .slice(-1)[0]?.content.slice(0, 40)}...
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Área de mensagens */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedPatientId ? (
            <>
              {/* Cabeçalho da conversa */}
              <div className="p-4 bg-white border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {patients.find(p => p.id === selectedPatientId)?.name}
                </h2>
              </div>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedPatientMessages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-lg rounded-lg px-4 py-2 ${
                        message.type === 'outgoing'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-900'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.type === 'outgoing' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Campo de entrada */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="input flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    className="btn-primary px-4"
                    onClick={handleSendMessage}
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Selecione uma conversa para começar
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
} 