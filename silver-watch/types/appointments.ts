export interface Appointment {
  id: string
  patientId: string
  providerId: string
  type: "Virtual" | "In-Person"
  status: "Scheduled" | "Confirmed" | "Completed" | "Cancelled" | "No-Show"
  date: string
  time: string
  duration: number
  purpose: string
  notes?: string
  location?: string
  meetingLink?: string
  reminders: Array<{
    type: "Email" | "SMS" | "Push"
    scheduledFor: string
    sent: boolean
  }>
}

export interface Schedule {
  id: string
  userId: string
  role: "provider" | "patient"
  availability: Array<{
    dayOfWeek: number
    startTime: string
    endTime: string
    available: boolean
  }>
  appointments: Appointment[]
  breaks: Array<{
    startTime: string
    endTime: string
    reason?: string
  }>
}

export interface AppointmentRequest {
  patientId: string
  preferredDates: string[]
  type: "Virtual" | "In-Person"
  purpose: string
  notes?: string
  urgency: "Normal" | "Urgent"
}

