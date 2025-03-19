export type UserRole = "admin" | "caregiver" | "technician" | "patient";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole | null;
  status: "Active" | "Inactive";
  last_active?: string | null;
  phone_number?: string;
  profile_image?: string | null;
  group_names: string[];
  profile?: unknown | null;
  last_login?: string; 
  is_superuser: boolean; 
  username: string; 
  is_staff: boolean; 
  is_active: boolean; 
  date_joined: string; 
  groups: number[]; 
  user_permissions: string[]; // Added from JSON, assuming permissions are string-based
  address: string;
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

