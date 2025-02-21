export type UserRole = "admin" | "caregiver" | "technician" | "patient"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  status: "Active" | "Inactive"
  lastActive: string
  createdAt: string
  updatedAt: string
  profileImage?: string
  phoneNumber?: string
}

export interface UserProfile extends User {
  department?: string
  specialization?: string
  licenseNumber?: string
  emergencyContact?: {
    name: string
    relationship: string
    phoneNumber: string
  }
  notificationPreferences: NotificationPreferences
}

export interface NotificationPreferences {
  emergencyAlerts: boolean
  systemUpdates: boolean
  dailyReports: boolean
  teamMessages: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
}

export interface UserSession {
  userId: string
  role: UserRole
  token: string
  expiresAt: string
}

export interface AuthResponse {
  user: User
  session: UserSession
}

