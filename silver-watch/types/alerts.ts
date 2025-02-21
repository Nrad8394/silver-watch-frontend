export interface Alert {
  id: string
  type: "Emergency" | "Warning" | "Info"
  category: "Health" | "Device" | "System" | "Security"
  priority: "High" | "Medium" | "Low"
  status: "Active" | "Acknowledged" | "Resolved"
  timestamp: string
  source: {
    type: "Device" | "System" | "User"
    id: string
    name: string
  }
  target: {
    type: "Patient" | "Device" | "System"
    id: string
    name: string
  }
  message: string
  details?: Record<string, string>
  acknowledgement?: {
    by: string
    at: string
    notes?: string
  }
  resolution?: {
    by: string
    at: string
    action: string
    notes?: string
  }
}

export interface NotificationChannel {
  id: string
  userId: string
  type: "Email" | "SMS" | "Push"
  enabled: boolean
  target: string // email address or phone number
  verified: boolean
}

export interface AlertRule {
  id: string
  name: string
  condition: {
    metric: string
    operator: ">" | "<" | ">=" | "<=" | "=" | "!="
    value: number
    duration?: number // in seconds
  }
  priority: "High" | "Medium" | "Low"
  actions: Array<{
    type: "Notification" | "Email" | "SMS" | "API"
    target: string
    template: string
  }>
  enabled: boolean
  createdBy: string
  updatedBy: string
}

