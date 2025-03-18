import { 
  LOGIN_URL, BASE_URL, REGISTER_URL, REFRESH_TOKEN_URL, USER_URL, 
  LOGOUT_URL, CHANGE_PASSWORD_URL, RESEND_EMAIL_URL, RESET_PASSWORD_URL, VERIFY_TOKEN_URL 
} from '@/handler/apiConfig';
import { api, handleApiError } from '@/utils/api';
import axios, { AxiosError } from 'axios';
import { User } from '@/types/users';
import Cookies from 'js-cookie';
import { DjangoPaginatedResponse } from '@/types';
export interface AuthResponse {
  access: string;
  refresh: string;
  user: Partial<User>;
}

interface ApiErrorResponse {
  detail?: string;
  [key: string]: unknown;
}

export const apiPlain = axios.create({
  baseURL: BASE_URL,
});

/**
* AuthManager handles authentication and user-related API operations.
*/
class AuthManager {
  /**
   * Login function to authenticate users.
   * @param email - User email.
   * @param password - User password.
   * @returns {Promise<AuthResponse | undefined>} - Auth tokens and user data.
   */
  async login(email: string, password: string): Promise<AuthResponse | undefined> {
    try {
        Cookies.remove('accessToken');

        const response = await apiPlain.post<AuthResponse>(LOGIN_URL, { email, password });

        this.storeTokens(response.data.access,); // Only store access token
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError<ApiErrorResponse>);
    }
}

  /**
   * Registers a new user.
   * @param email - User email.
   * @param password1 - Password.
   * @param password2 - Confirm password.
   * @param role - User role.
   * @returns {Promise<AuthResponse | undefined>} - Auth tokens and user data.
   */
  async register(email: string, password1: string, password2: string, role: string): Promise<AuthResponse | undefined> {
      try {
          const response = await apiPlain.post<AuthResponse>(REGISTER_URL, { email, password1, password2, role });

          this.storeTokens(response.data.access);
          return response.data;
      } catch (error) {
          handleApiError(error as AxiosError<ApiErrorResponse>);
      }
  }

  /**
   * Refreshes the access token.
   * @returns {Promise<AuthResponse | undefined>} - New auth tokens.
   */
  async refreshToken(): Promise<AuthResponse | undefined> {
    try {
        const response = await apiPlain.post<AuthResponse>(REFRESH_TOKEN_URL, {}, { withCredentials: true });

        Cookies.set('accessToken', response.data.access, { expires: 1, secure: true, sameSite: 'Strict' });
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError<ApiErrorResponse>);
    }
}


  /**
   * Logs out the user and removes authentication tokens.
   */
  async logout(): Promise<void> {
      try {
          const refreshToken = Cookies.get('refreshToken');
          if (refreshToken) {
              await api.post(LOGOUT_URL, { refresh: refreshToken });
          }
      } catch (error) {
          handleApiError(error as AxiosError<ApiErrorResponse>);
      } finally {
          this.clearTokens();
      }
  }

  /**
   * Changes the user's password.
   * @param newPassword1 - New password.
   * @param newPassword2 - Confirm new password.
   */
  async changePassword(newPassword1: string, newPassword2: string): Promise<void> {
      try {
          await api.post(CHANGE_PASSWORD_URL, { new_password1: newPassword1, new_password2: newPassword2 });
      } catch (error) {
          handleApiError(error as AxiosError<ApiErrorResponse>);
      }
  }

  /**
   * Resends the email verification link.
   * @param email - User email.
   */
  async resendEmail(email: string): Promise<void> {
      try {
          await apiPlain.post(RESEND_EMAIL_URL, { email });
      } catch (error) {
          handleApiError(error as AxiosError<ApiErrorResponse>);
      }
  }

  /**
   * Sends a password reset request.
   * @param email - User email.
   */
  async resetPassword(email: string): Promise<void> {
      try {
          await api.post(RESET_PASSWORD_URL, { email });
      } catch (error) {
          handleApiError(error as AxiosError<ApiErrorResponse>);
      }
  }

  /**
   * Verifies an authentication token.
   * @param token - The verification token.
   */
  async verifyToken(token: string): Promise<void> {
      try {
          await apiPlain.post(VERIFY_TOKEN_URL, { token });
      } catch (error) {
          handleApiError(error as AxiosError<ApiErrorResponse>);
      }
  }

  /**
   * Fetches the authenticated user's details.
   * @returns {Promise<Partial<User>>} - User data.
   */
  async getUser(): Promise<Partial<User>> {
    try {
        const response = await api.get<DjangoPaginatedResponse<User>>(USER_URL);
        return response.data.results[0];  // Now `data` exists on `response`
    } catch (error) {
        handleApiError(error as AxiosError<ApiErrorResponse>);
        throw error;
    }
}

  /**
   * Updates user profile.
   * @param userId - User ID.
   * @param formData - FormData containing updated user details.
   * @returns {Promise<Partial<User>>} - Updated user data.
   */
  async updateUser(userId: string, formData: FormData): Promise<Partial<User>> {
      try {
          const response = await api.patch(`${USER_URL}${userId}/`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
          });
          return response.data;
      } catch (error) {
          handleApiError(error as AxiosError<ApiErrorResponse>);
          throw error;
      }
  }

  /**
   * Deletes a user account.
   * @param userId - User ID.
   */
  async deleteUser(userId: string): Promise<void> {
      try {
          await api.delete(`${USER_URL}${userId}/`);
      } catch (error) {
          handleApiError(error as AxiosError<ApiErrorResponse>);
          throw error;
      }
  }

  /**
   * Stores authentication tokens securely.
   * @param accessToken - JWT access token.
   * @param refreshToken - JWT refresh token.
   */
/**
 * Stores the access token securely.
 * @param accessToken - JWT access token.
 */
private storeTokens(accessToken: string ): void {
  Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
}


  /**
   * Clears authentication tokens from cookies.
   */
  private clearTokens(): void {
      Cookies.remove('accessToken');
  }
}

const authManager = new AuthManager();
export default authManager;
