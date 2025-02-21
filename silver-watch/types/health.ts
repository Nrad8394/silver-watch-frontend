export interface VitalSigns {
  id: string
  patientId: string
  timestamp: string
  heartRate: {
    value: number
    unit: "bpm"
    status: "Normal" | "Warning" | "Critical"
  }
  bloodPressure: {
    systolic: number
    diastolic: number
    unit: "mmHg"
    status: "Normal" | "Warning" | "Critical"
  }
  temperature: {
    value: number
    unit: "°C"
    status: "Normal" | "Warning" | "Critical"
  }
  bloodOxygen: {
    value: number
    unit: "%"
    status: "Normal" | "Warning" | "Critical"
  }
  respiratoryRate: {
    value: number
    unit: "breaths/min"
    status: "Normal" | "Warning" | "Critical"
  }
  consciousness: {
    value: number
    scale: "Glasgow Coma Scale"
    status: "Normal" | "Warning" | "Critical"
  }
}

export interface HealthMetrics {
  id: string
  patientId: string
  date: string
  steps: number
  activeMinutes: number
  heartRateZoneMinutes: number
  caloriesBurned: number
  distanceWalked: number
  sleepHours: number
}

export interface MedicalHistory {
  id: string
  patientId: string
  conditions: Array<{
    name: string
    diagnosedDate: string
    status: "Active" | "Resolved" | "Managed"
  }>
  allergies: Array<{
    substance: string
    severity: "Mild" | "Moderate" | "Severe"
    reaction: string
  }>
  surgeries: Array<{
    procedure: string
    date: string
    hospital: string
  }>
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    startDate: string
    endDate?: string
  }>
}

export interface HealthTrend {
  metric: keyof VitalSigns
  data: Array<{
    timestamp: string
    value: number
  }>
  range: {
    min: number
    max: number
    unit: string
  }
}

