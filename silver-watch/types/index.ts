// Type for role statistics
export interface RoleStat {
  role: string;
  count: number;
  change: string;
}

// Type for user
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

// Type for system preference
export interface SystemPreference {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// Type for notification setting
export interface NotificationSetting {
  id: string;
  category: string;
  options: NotificationOption[];
}

// Type for notification option
export interface NotificationOption {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// Type for integration
export interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  icon: React.ReactNode;
}

// Type for appearance setting
export interface AppearanceSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// Type for security stat
export interface SecurityStat {
  title: string;
  description: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
}

// Type for security control
export interface SecurityControl {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// Type for security event
export interface SecurityEvent {
  type: string;
  message: string;
  timestamp: string;
  status: string;
  icon: React.ReactNode;
}

// Type for access log
export interface AccessLog {
  user: string;
  ip: string;
  location: string;
  time: string;
  status: string;
}

// Type for recent user activity
export interface RecentUserActivity {
  action: string;
  time: string;
}

// Type for system health
export interface SystemHealth {
  name: string;
  status: string;
}

// Type for system stat
export interface SystemStat {
  title: string;
  description: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
}

// Type for device category
export interface DeviceCategory {
  name: string;
  devices: number;
  status: string;
  uptime: number;
}

// Type for device
export interface Device {
  name: string;
  id: string;
  status: string;
  signal: number;
  battery: number;
  lastMaintenance: string;
}

// Type for event
export interface Event {
  title: string;
  time: string;
}

// Type for reminder
export interface Reminder {
  task: string;
  due: string;
  priority: string;
}

// Type for vital trend
export interface VitalTrend {
  name: string;
  average: number | string;
  unit: string;
  range: string;
  trend: string;
  icon: React.ReactNode;
}

// Type for activity summary
export interface ActivitySummary {
  name: string;
  average: string;
  icon: React.ReactNode;
}

// Type for medication history
export interface MedicationHistory {
  medication: string;
  dosage: string;
  time: string;
  status: string;
}

// Type for medical report
export interface MedicalReport {
  title: string;
  date: string;
}
