// const BASE_URL = 'https://silver-watch-backend-production.up.railway.app';
const BASE_URL = 'http://localhost:80';

export { BASE_URL };

// API Endpoints for User, Authentication and Password reset
// Auth Urls
export const REGISTER_URL = `${BASE_URL}/register/`;
export const LOGIN_URL = `${BASE_URL}/login/`;
export const LOGOUT_URL = `${BASE_URL}/logout/`;
export const VERIFY_TOKEN_URL = `${BASE_URL}/token/verify/`;
export const CHANGE_PASSWORD_URL = `${BASE_URL}/password/change`;
export const RESEND_EMAIL_URL = `${BASE_URL}/resend-email/`;
export const RESET_PASSWORD_URL = `${BASE_URL}/password/reset/`;
// User Urls
export const USER_URL = `${BASE_URL}/api/users/`;
// Groups & permissions
export const GROUPS_URL = `${BASE_URL}/api/groups/`;
export const PERMISSIONS_URLS = `${BASE_URL}/api/permissions/`;
export const CHECK_GROUP_WITH_PERMISSIONS_URL = `${BASE_URL}/groups-with-permission/change_customuser/`;

// Token Refresh URL
export const REFRESH_TOKEN_URL = `${BASE_URL}/token/refresh/`;
// New URLs

export const USERS_URL = `/api/users/`;

