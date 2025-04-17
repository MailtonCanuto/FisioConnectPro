import { useState } from 'react'
import { format, startOfWeek, addDays, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Appointment } from '@/types'

interface CalendarProps {
  appointments: Appointment[]
  onSelectDate: (date: Date) => void
  onSelectAppointment: (appointment: Appointment) => void
}

export default function Calendar({ appointments, onSelectDate, onSelectAppointment }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()))

  const weekDays = [...Array(7)].map((_, i) => addDays(currentWeek, i))

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    onSelectDate(date)
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          Semana anterior
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentWeek, "MMMM yyyy", { locale: ptBR })}
        </h2>
        <button
          onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          Próxima semana
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {weekDays.map((day) => (
          <div
            key={day.toString()}
            className={`bg-white p-4 ${
              isSameDay(day, selectedDate) ? 'bg-primary-50' : ''
            }`}
            onClick={() => handleDateSelect(day)}
          >
            <div className="font-semibold text-sm text-gray-900">
              {format(day, 'EEEE', { locale: ptBR })}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {format(day, 'd')}
            </div>
            <div className="mt-2 space-y-1">
              {appointments
                .filter((apt) => isSameDay(new Date(apt.date), day))
                .map((appointment) => (
                  <button
                    key={appointment.id}
                    onClick={() => onSelectAppointment(appointment)}
                    className="block w-full text-left px-2 py-1 text-sm rounded-md hover:bg-gray-100"
                  >
                    <div className="font-medium">{appointment.time}</div>
                    <div className="text-gray-600 truncate">
                      {appointment.patientName}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 