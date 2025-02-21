export interface HealthReport {
  id: string
  patientId: string
  type: "Daily" | "Weekly" | "Monthly" | "Custom"
  period: {
    start: string
    end: string
  }
  vitalStats: {
    heartRate: {
      avg: number
      min: number
      max: number
      outOfRange: number
    }
    bloodPressure: {
      systolicAvg: number
      diastolicAvg: number
      outOfRange: number
    }
    temperature: {
      avg: number
      outOfRange: number
    }
    bloodOxygen: {
      avg: number
      outOfRange: number
    }
  }
  activities: {
    totalSteps: number
    activeMinutes: number
    restingHours: number
  }
  incidents: Array<{
    timestamp: string
    type: string
    severity: string
    description: string
  }>
  medications: Array<{
    name: string
    adherence: number
    missed: number
  }>
  generatedAt: string
  generatedBy: string
}

export interface DeviceReport {
  id: string
  deviceId: string
  period: {
    start: string
    end: string
  }
  uptime: number
  connectivity: {
    quality: number
    disconnections: number
  }
  batteryStats: {
    averageLevel: number
    chargeCycles: number
  }
  maintenance: Array<{
    type: string
    date: string
    outcome: string
    technician: string
  }>
  issues: Array<{
    timestamp: string
    type: string
    resolution?: string
  }>
  readings: {
    total: number
    invalid: number
    accuracy: number
  }
}

export interface AnalyticsData {
  timeframe: string
  metrics: {
    activeUsers: number
    totalPatients: number
    criticalAlerts: number
    responseTime: number
    deviceUtilization: number
  }
  trends: Array<{
    metric: string
    data: Array<{
      timestamp: string
      value: number
    }>
  }>
  breakdown: {
    alertsByType: Record<string, number>
    alertsByPriority: Record<string, number>
    devicesByStatus: Record<string, number>
  }
}

