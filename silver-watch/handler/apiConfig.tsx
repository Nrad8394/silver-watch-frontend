/**
 * API Configuration
 * 
 * This file centralizes all API endpoints based on the Silver Watch backend structure.
 * All endpoints are directly extracted from Django urls.py files and corresponding views.
 */

// Base URL Configuration - Change this based on your environment
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export { BASE_URL };

// ===================================================================
// Authentication & User Management
// ===================================================================
// From silver_watch/urls.py and userManager/urls.py - Django REST Auth endpoints
export const LOGIN_URL = `${BASE_URL}/login/`;  // From dj_rest_auth.urls
export const LOGOUT_URL = `${BASE_URL}/logout/`;  // From dj_rest_auth.urls
export const CHANGE_PASSWORD_URL = `${BASE_URL}/password/change/`;  // From dj_rest_auth.urls
export const RESET_PASSWORD_URL = `${BASE_URL}/password/reset/`;  // From dj_rest_auth.urls
export const REGISTER_URL = `${BASE_URL}/register/`;  // From dj_rest_auth.registration.urls
export const TOKEN_URL = `${BASE_URL}/token/`;  // TokenObtainPairView in silver_watch/urls.py
export const REFRESH_TOKEN_URL = `${BASE_URL}/token/refresh/`;  // TokenRefreshView in silver_watch/urls.py
export const VERIFY_TOKEN_URL = `${BASE_URL}/token/verify/`;  

// From userManager/urls.py - Custom auth endpoints
export const EMAIL_CONFIRMATION_URL = `${BASE_URL}/register/account-confirm-email/`;  // confirm_email function
export const EMAIL_CONFIRMATION_DONE_URL = `${BASE_URL}/email-confirmation-done/`;  // email_confirmation_done function
export const EMAIL_CONFIRMATION_FAILURE_URL = `${BASE_URL}/email-confirmation-failure/`;  // email_confirmation_failure function
export const RESEND_EMAIL_URL = `${BASE_URL}/resend-email/`;  // ResendEmailVerificationView
export const PASSWORD_RESET_CONFIRM_URL = `${BASE_URL}/password-reset-confirm/`;  // CustomPasswordResetConfirmView

// ===================================================================
// User Management
// ===================================================================
// From userManager/urls.py - UserViewSet endpoints
export const USER_URL = `${BASE_URL}/api/users/`;  // CustomUserViewSet - CRUD operations
export const USER_PROFILE_URL = `${BASE_URL}/api/profiles/`;  // UserProfileViewSet - CRUD operations
export const NOTIFICATION_PREFERENCES_URL = `${BASE_URL}/api/notifications/`;  // NotificationPreferencesViewSet - CRUD operations
export const EMERGENCY_CONTACT_URL = `${BASE_URL}/api/contacts/`;  // EmergencyContactViewSet - CRUD operations

// ===================================================================
// Device Management
// ===================================================================
// From devices/urls.py - DeviceViewSet endpoints
export const DEVICE_URL = `${BASE_URL}/devices/devices/`;  // DeviceViewSet - CRUD operations
export const DEVICE_SETTINGS_URL = `${BASE_URL}/devices/settings/`;  // DeviceSettingsViewSet - CRUD operations
export const DEVICE_MAINTENANCE_URL = `${BASE_URL}/devices/maintenance/`;  // DeviceMaintenanceViewSet - CRUD operations
export const DEVICE_READINGS_URL = `${BASE_URL}/devices/readings/`;  // DeviceReadingViewSet - Read operations

// ===================================================================
// Vitals Management
// ===================================================================
// From vitals/urls.py - VitalSignsViewSet endpoints
export const VITALS_SIGNS_URL = `${BASE_URL}/vitals/vital-signs/`;  // VitalSignsViewSet - CRUD operations
export const HEALTH_METRICS_URL = `${BASE_URL}/vitals/health-metrics/`;  // HealthMetricsViewSet - CRUD operations
export const MEDICAL_HISTORY_URL = `${BASE_URL}/vitals/medical-history/`;  // MedicalHistoryViewSet - CRUD operations
export const HEALTH_TRENDS_URL = `${BASE_URL}/vitals/health-trends/`;  // HealthTrendViewSet - CRUD operations

// ===================================================================
// Alerts Management
// ===================================================================
// From alerts/urls.py - AlertViewSet endpoints 
export const ALERTS_URL = `${BASE_URL}/alerts/alerts/`;  // AlertViewSet - CRUD operations
export const NOTIFICATION_CHANNELS_URL = `${BASE_URL}/alerts/notification-channels/`;  // NotificationChannelViewSet - CRUD operations
export const ALERT_RULES_URL = `${BASE_URL}/alerts/alert-rules/`;  // AlertRuleViewSet - CRUD operations


// ===================================================================
// Appointments Management
// ===================================================================
// From appointments/urls.py - AppointmentViewSet endpoints
export const APPOINTMENT_URL = `${BASE_URL}/appointments/appointments/`;  // AppointmentViewSet - CRUD operations
export const REMINDER_URL = `${BASE_URL}/appointments/reminders/`;  // ReminderViewSet - CRUD operations
export const SCHEDULE_URL = `${BASE_URL}/appointments/schedules/`;  // ScheduleViewSet - CRUD operations
export const APPOINTMENT_REQUEST_URL = `${BASE_URL}/appointments/requests/`;  // AppointmentRequestViewSet - CRUD operations

// ===================================================================
// Chat Management
// ===================================================================
// From chats/urls.py - ChatViewSet endpoints
export const CONVERSATION_URL = `${BASE_URL}/chats/conversations/`;  // ConversationViewSet - CRUD operations
export const MESSAGE_URL = `${BASE_URL}/chats/messages/`;  // MessageViewSet - CRUD operations
export const CONTACT_URL = `${BASE_URL}/chats/contacts/`;  // ContactViewSet - CRUD operations

// ===================================================================
// Reports Management
// ===================================================================
// From reports/urls.py - ReportViewSet endpoints
export const HEALTH_REPORT_URL = `${BASE_URL}/reports/health-reports/`;  // HealthReportViewSet - CRUD operations
export const DEVICE_REPORT_URL = `${BASE_URL}/reports/device-reports/`;  // DeviceReportViewSet - CRUD operations
export const ANALYTICS_DATA_URL = `${BASE_URL}/reports/analytics-data/`;  // AnalyticsDataViewSet - CRUD operations

// ===================================================================
// Settings Management
// ===================================================================
// From settings/urls.py - SettingsViewSet endpoints
export const SYSTEM_SETTINGS_URL = `${BASE_URL}/settings/system-settings/`;  // SystemSettingsViewSet - CRUD operations
export const API_KEY_URL = `${BASE_URL}/settings/api-keys/`;  // APIKeyViewSet - CRUD operations
export const WEBHOOK_URL = `${BASE_URL}/settings/webhooks/`;  // WebhookViewSet - CRUD operations
export const USER_PREFERENCES_URL = `${BASE_URL}/settings/user-preferences/`;  // UserPreferencesViewSet - CRUD operations

// ===================================================================
// M-PESA Integration
// ===================================================================
// From django_daraja/urls.py - M-PESA endpoints
export const MPESA_INDEX_URL = `${BASE_URL}/tests/`;  // index view in django_daraja
export const MPESA_OAUTH_SUCCESS_URL = `${BASE_URL}/tests/oauth/success`;  // oauth_success view
export const MPESA_STK_PUSH_SUCCESS_URL = `${BASE_URL}/tests/stk-push/success`;  // stk_push_success view
export const MPESA_BUSINESS_PAYMENT_SUCCESS_URL = `${BASE_URL}/tests/business-payment/success`;  // business_payment_success view

// ===================================================================
// Helper Functions
// ===================================================================
/**
 * Replaces {id} placeholder in URL with actual ID
 * @param url Base URL with {id} placeholder
 * @param id ID to insert
 * @returns URL with ID inserted
 */
export const withId = (url: string, id: string | number): string => {
  return url.replace('{id}', id.toString());
};

/**
 * Standard API endpoint structure for ViewSets
 * These follow the REST convention for Django REST Framework ViewSets
 */
export const API_ENDPOINTS = {
  // For any ViewSet, these standard endpoints are available:
  // LIST: GET /{base_url}/
  // CREATE: POST /{base_url}/
  // RETRIEVE: GET /{base_url}/{id}/
  // UPDATE: PUT /{base_url}/{id}/
  // PARTIAL_UPDATE: PATCH /{base_url}/{id}/
  // DESTROY: DELETE /{base_url}/{id}/
};