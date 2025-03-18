/**
 * API Service Interface
 * 
 * This file provides a centralized interface for all API endpoints.
 * It serves as a reference for URL constants throughout the application.
 * The class acts purely as a namespace for endpoint URLs - no implementation logic.
 */

import {
  // Base URL
  BASE_URL,
  
  // Authentication & User Management
  LOGIN_URL,
  REGISTER_URL,
  REFRESH_TOKEN_URL,
  USER_URL,
  LOGOUT_URL,
  CHANGE_PASSWORD_URL,
  RESEND_EMAIL_URL,
  RESET_PASSWORD_URL,
  VERIFY_TOKEN_URL,
  EMAIL_CONFIRMATION_URL,
  
  // Health Monitoring
  VITALS_SIGNS_URL,
  HEALTH_METRICS_URL,
  MEDICAL_HISTORY_URL,
  HEALTH_TRENDS_URL,
  
  // Device Management
  DEVICE_URL,
  DEVICE_READINGS_URL,
  DEVICE_SETTINGS_URL,
  DEVICE_MAINTENANCE_URL,
  
  // Appointments & Scheduling
  APPOINTMENT_URL,
  SCHEDULE_URL,
  APPOINTMENT_REQUEST_URL,
  REMINDER_URL,
  
  // Notifications & Alerts
  NOTIFICATION_PREFERENCES_URL,
  ALERTS_URL,
  ALERT_RULES_URL,
  NOTIFICATION_CHANNELS_URL,
  
  // Reports & Analytics
  HEALTH_REPORT_URL,
  DEVICE_REPORT_URL,
  ANALYTICS_DATA_URL,
  
  // Communication
  MESSAGE_URL,
  CONVERSATION_URL,
  CONTACT_URL,
  EMERGENCY_CONTACT_URL,
  
  // Settings & Configuration
  SYSTEM_SETTINGS_URL,
  USER_PREFERENCES_URL,
  USER_PROFILE_URL,
  API_KEY_URL,
  WEBHOOK_URL,
  
  // Helper function
  withId,
} from './apiConfig';

/**
 * ApiService
 * 
 * A static class that provides a clean interface to all backend API endpoints.
 * This is purely a set of URL constants - no implementation logic is included.
 * 
 * Example usage:
 * import ApiService from '@/handler/ApiService';
 * 
 * // Use endpoints directly
 * api.get(ApiService.HEALTH_RECORDS_URL)
 */
class ApiService {
  /**
   * Base URL
   */
  static BASE_URL = BASE_URL;

  /**
   * Authentication & User Management
   * ---------------------------------
   * Endpoints for handling user registration, authentication and profile management.
   */
  static REGISTER_URL = REGISTER_URL;                     // User registration endpoint
                                                          // POST: {email, password, name, role}
  static LOGIN_URL = LOGIN_URL;                           // User login endpoint
                                                          // POST: {email, password}
  static LOGOUT_URL = LOGOUT_URL;                         // User logout endpoint
                                                          // POST: {}
  static VERIFY_TOKEN_URL = VERIFY_TOKEN_URL;             // Token verification endpoint
                                                          // POST: {token}
  static REFRESH_TOKEN_URL = REFRESH_TOKEN_URL;           // Token refresh endpoint
                                                          // POST: {} (uses httpOnly cookie)
  static CHANGE_PASSWORD_URL = CHANGE_PASSWORD_URL;       // Change user password endpoint
                                                          // POST: {old_password, new_password}
  static RESET_PASSWORD_URL = RESET_PASSWORD_URL;         // Request password reset endpoint
                                                          // POST: {email}
  static RESEND_EMAIL_URL = RESEND_EMAIL_URL;             // Resend verification email endpoint
                                                          // POST: {email}
  static EMAIL_CONFIRMATION_URL = EMAIL_CONFIRMATION_URL; // Email confirmation endpoint
                                                          // GET: ?key={verification_key}
  static USER_URL = USER_URL;                             // User CRUD operations endpoint
                                                          // GET: List/retrieve users with optional filtering
                                                          // PATCH: Update user profile
                                                          // DELETE: Remove user account

  /**
   * Health Monitoring
   * ----------------
  /**
   * Health Monitoring
   * ----------------
   * Endpoints for tracking vital signs and health records.
   */
  static VITAL_SIGNS_URL = VITALS_SIGNS_URL;              // Vital signs tracking endpoint
                                                          // GET: Retrieve vital signs history
                                                          // POST: {patient_id, type, value, timestamp}
                                                          
  static HEALTH_RECORDS_URL = HEALTH_METRICS_URL;         // Health records CRUD endpoint
                                                          // GET: List/retrieve health records
                                                          // POST: {patient_id, record_type, notes, data}
                                                          
  static MEDICATION_URL = MEDICAL_HISTORY_URL;            // Medication management endpoint
                                                          // GET: List/retrieve medication schedules
                                                          // POST: {patient_id, name, dosage, schedule}

  /**
   * Device Management
   * ----------------
   * Endpoints for handling connected health devices.
   */
  static DEVICES_URL = DEVICE_URL;                        // Devices CRUD endpoint
                                                          // GET: List/retrieve devices
                                                          // POST: {device_id, type, name, patient_id}
                                                          
  static DEVICE_READINGS_URL = DEVICE_READINGS_URL;       // Device readings endpoint
                                                          // GET: Retrieve readings from devices
                                                          // POST: {device_id, reading_type, value, timestamp}
                                                          
  static CALIBRATION_URL = DEVICE_SETTINGS_URL;           // Device calibration endpoint
                                                          // GET: Retrieve calibration history
                                                          // POST: {device_id, parameters, timestamp}
                                                          
  static DEVICE_ASSIGNMENT_URL = DEVICE_MAINTENANCE_URL;  // Device assignment endpoint
                                                          // POST: {device_id, patient_id, location}
                                                          // DELETE: Remove device assignment

  /**
   * Patient Management
   * -----------------
   * Endpoints for managing patients and care plans.
   */
  static PATIENTS_URL = USER_PROFILE_URL;                 // Patients CRUD endpoint
                                                          // GET: List/retrieve patients
                                                          // POST: {name, dob, medical_history, contact}
                                                          
  static CAREGIVERS_URL = EMERGENCY_CONTACT_URL;          // Caregivers CRUD endpoint
                                                          // GET: List/retrieve caregivers
                                                          // POST: {user_id, qualifications, patients}
                                                          
  static CARE_PLANS_URL = HEALTH_TRENDS_URL;              // Care plans CRUD endpoint
                                                          // GET: List/retrieve care plans
                                                          // POST: {patient_id, goals, activities, schedule}
                                                          
  static PATIENT_MONITORING_URL = NOTIFICATION_PREFERENCES_URL; // Patient monitoring endpoint
                                                               // GET: Real-time patient monitoring data
                                                               // POST: {patient_id, monitoring_type}

  /**
   * Appointments & Scheduling
   * ------------------------
   * Endpoints for managing appointments and schedules.
   */
  static APPOINTMENTS_URL = APPOINTMENT_URL;              // Appointments CRUD endpoint
                                                          // GET: List/retrieve appointments
                                                          // POST: {patient_id, provider_id, date, time, type}
                                                          // POST: {user_id, availability, appointments}
  static SCHEDULE_URL = SCHEDULE_URL;                     // Schedule management endpoint
                                                          // GET: List/retrieve schedules
                                                          // POST: {user_id, availability, appointments}
                                                          
  static APPOINTMENT_REQUEST_URL = APPOINTMENT_REQUEST_URL; // Appointment request endpoint
                                                            // POST: {patient_id, preferred_dates, reason}
                                                            // PATCH: Update appointment request status
  static REMINDER_URL = REMINDER_URL; // Reminder management endpoint
                                      // GET: List/retrieve reminders for user
                                      // POST: {user_id, message, date, time}
                                      // DELETE: Remove reminder by ID

  /**
   * Notifications
   * -------------
   * Endpoints for managing notifications and alerts.
   */
  static NOTIFICATIONS_URL = NOTIFICATION_CHANNELS_URL;   // Notifications CRUD endpoint
                                                          // GET: List/retrieve notifications
                                                          // POST: {user_id, message, type, read}
                                                          
  static ALERTS_URL = ALERTS_URL;                         // Health alerts endpoint
                                                          // GET: List/retrieve health alerts
                                                          // POST: {patient_id, alert_type, message, severity}
                                                          
  static ALERT_RULES_URL = ALERT_RULES_URL;               // Alert rules configuration endpoint
                                                          // GET: List/retrieve alert rules
                                                          // POST: {metric, condition, threshold, action}

  /**
   * Reports & Analytics
   * ------------------
   * Endpoints for generating reports and analytics.
   */
  static REPORTS_URL = HEALTH_REPORT_URL;                 // Reports generation endpoint
                                                          // GET: List/retrieve available reports
                                                          // POST: {report_type, parameters, date_range}
                                                          
  static ANALYTICS_URL = DEVICE_REPORT_URL;               // Analytics endpoint
                                                          // GET: Retrieve health analytics
                                                          // POST: {analysis_type, metrics, filters}
                                                          
  static ANALYTICS_DATA_URL = ANALYTICS_DATA_URL;         // Analytics data endpoint
                                                          // GET: Raw data for analytics
                                                          // POST: {data_type, time_range, filters}

  /**
   * Communication
   * -------------
   * Endpoints for messaging and communication.
   */
  static MESSAGES_URL = MESSAGE_URL;                      // Messages CRUD endpoint
                                                          // GET: List/retrieve messages
                                                          // POST: {sender_id, recipient_id, content}
                                                          
  static CONVERSATION_URL = CONVERSATION_URL;             // Conversation management endpoint
                                                          // GET: List/retrieve conversations
                                                          // POST: {participants, title, type}

  /**
   * Settings & Configuration
   * -----------------------
   * Endpoints for system and user settings.
   */
  static SETTINGS_URL = SYSTEM_SETTINGS_URL;              // Settings endpoint
                                                          // GET: Retrieve system settings
                                                          // PATCH: Update specific settings
                                                          
  static USER_PREFERENCES_URL = USER_PREFERENCES_URL;     // User preferences endpoint
                                                          // GET: Retrieve user preferences
                                                          // PATCH: Update user preferences
  
  static API_KEY_URL = API_KEY_URL;                       // API key management endpoint
                                                          // GET: List/retrieve API keys
                                                          // POST: Generate new API key
                                                          // DELETE: Revoke API key

  static SYSTEM_CONFIG_URL = WEBHOOK_URL;                 // System configuration endpoint
                                                          // GET: Retrieve system configuration
                                                          // PATCH: Update system configuration
                                                          // POST: Generate new API key
                                                          // DELETE: Revoke API key

  /**
   * Contact
   * -------
   * Contact form and support endpoints.
   */
  static CONTACT_URL = CONTACT_URL;                       // Contact form submission endpoint
                                                          // POST: {name, email, message}

  /**
   * Helper method to replace {id} placeholder in URL with actual ID
   * @param url Base URL with {id} placeholder
   * @param id ID to insert
   * @returns URL with ID inserted
   */
  static withId = withId;
}

export default ApiService;
