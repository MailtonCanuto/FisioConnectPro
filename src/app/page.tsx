'use client'

import Layout from '@/components/layout/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Resumo do dia */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo de hoje</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-primary-600">5</p>
              <p className="text-sm text-gray-500">Sessões agendadas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">3</p>
              <p className="text-sm text-gray-500">Pacientes atendidos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">1</p>
              <p className="text-sm text-gray-500">Faltas</p>
            </div>
          </div>
        </div>

        {/* Próximos atendimentos */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximos atendimentos</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Ana Souza</p>
                <p className="text-sm text-gray-500">10:00</p>
              </div>
              <button className="btn-primary text-sm">Ver detalhes</button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Lucas Lima</p>
                <p className="text-sm text-gray-500">11:00</p>
              </div>
              <button className="btn-primary text-sm">Ver detalhes</button>
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alertas recentes</h2>
          <div className="space-y-4">
            <div className="flex items-center text-yellow-600">
              <span className="text-sm">1 mensagem não respondida</span>
            </div>
            <div className="flex items-center text-red-600">
              <span className="text-sm">Documento vencendo em breve</span>
            </div>
            <div className="flex items-center text-orange-600">
              <span className="text-sm">Pagamento pendente</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 