export interface SystemSettings {
  id: string
  general: {
    siteName: string
    timezone: string
    language: string
    dateFormat: string
    timeFormat: string
  }
  security: {
    sessionTimeout: number
    passwordPolicy: {
      minLength: number
      requireNumbers: boolean
      requireSymbols: boolean
      requireUppercase: boolean
      expiryDays: number
    }
    twoFactorAuth: {
      required: boolean
      methods: ("email" | "sms" | "authenticator")[]
    }
    ipWhitelist: string[]
  }
  notifications: {
    emailEnabled: boolean
    smsEnabled: boolean
    pushEnabled: boolean
    alertThrottling: {
      enabled: boolean
      maxPerHour: number
      cooldownMinutes: number
    }
  }
  maintenance: {
    backupSchedule: "daily" | "weekly" | "monthly"
    backupRetention: number
    autoUpdate: boolean
    maintenanceWindow: {
      day: number
      startTime: string
      duration: number
    }
  }
  integrations: {
    enabled: boolean
    apiKeys: Array<{
      name: string
      key: string
      createdAt: string
      lastUsed?: string
    }>
    webhooks: Array<{
      url: string
      events: string[]
      active: boolean
    }>
  }
}

export interface UserPreferences {
  id: string
  userId: string
  theme: "light" | "dark" | "system"
  dashboard: {
    layout: "compact" | "comfortable" | "detailed"
    defaultView: "patients" | "devices" | "alerts"
    refreshInterval: number
  }
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    doNotDisturb: {
      enabled: boolean
      startTime: string
      endTime: string
      excludeEmergency: boolean
    }
  }
  accessibility: {
    highContrast: boolean
    largeText: boolean
    reduceMotion: boolean
    screenReader: boolean
  }
  privacy: {
    shareAnalytics: boolean
    shareLocation: boolean
    activityTracking: boolean
  }
}

