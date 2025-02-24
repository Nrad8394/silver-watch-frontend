export type UserRole = "admin" | "caregiver" | "technician" | "patient"

export interface User {
  id: string;
  email: string;
  first_name: string; // Matches JSON
  last_name: string;
  role: UserRole;
  status: "Active" | "Inactive";
  last_active?: string | null; // Matches JSON, nullable
  phone_number?: string; // Matches JSON, optional
  profile_image?: string | null; // Matches JSON, nullable
  group_names: string[]; // Matches JSON
  profile?: unknown | null; // Matches JSON, nullable
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

