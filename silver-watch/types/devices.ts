export interface Device {
  id: string
  type: "Heart Monitor" | "Temperature Sensor" | "Motion Sensor" | "Blood Pressure Monitor" | "Wearable Device"
  status: "Online" | "Offline" | "Warning" | "Critical"
  batteryLevel: number
  signalStrength: number
  lastMaintenance: string
  nextMaintenance: string
  location: string
  assignedTo?: string
  firmware: {
    version: string
    lastUpdate: string
    availableUpdate?: string
  }
  calibration: {
    lastCalibrated: string
    nextCalibration: string
    accuracy: number
    status: "Calibrated" | "Needs Calibration" | "In Progress"
  }
  readings: Array<{
    timestamp: string
    type: string
    value: number
    unit: string
  }>
}

export interface DeviceSettings {
  id: string
  deviceId: string
  sensitivity: number
  threshold: number
  sampleRate: number
  autoCalibration: boolean
  highPrecisionMode: boolean
  errorCompensation: boolean
  alertThresholds: {
    [key: string]: {
      min: number
      max: number
      unit: string
    }
  }
}

export interface DeviceMaintenance {
  id: string
  deviceId: string
  type: "Calibration" | "Battery Replacement" | "Firmware Update" | "Hardware Check"
  status: "Scheduled" | "In Progress" | "Completed" | "Failed"
  scheduledFor: string
  completedAt?: string
  technician?: string
  notes?: string
  results?: {
    success: boolean
    message: string
    readings?: Array<{
      metric: string
      before: number
      after: number
    }>
  }
}

