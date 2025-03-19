export interface VitalSigns {
  id: string;
  timestamp: string;
  heart_rate: number;
  heart_rate_status: string;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  blood_pressure_status: string;
  temperature: number;
  temperature_status: string;
  blood_oxygen: number;
  blood_oxygen_status: string;
  respiratory_rate: number;
  respiratory_rate_status: string;
  consciousness_value: number;
  consciousness_status: string;
  patient: string;
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

