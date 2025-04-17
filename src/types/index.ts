export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  phone: string
  email: string
  lastVisit: string
  status: 'active' | 'inactive'
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  date: string
  time: string
  type: 'initial' | 'followup' | 'evaluation'
  status: 'scheduled' | 'completed' | 'cancelled' | 'noshow'
}

export interface FinancialTransaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'income' | 'expense'
  status: 'paid' | 'pending' | 'overdue'
  category: string
  patientId?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'therapist' | 'receptionist'
  status: 'active' | 'inactive'
}

export interface MedicalRecord {
  id: string
  patientId: string
  date: string
  type: 'initial' | 'evolution' | 'discharge'
  content: string
  attachments?: string[]
  createdBy: string
} 