import { User } from './users';
// Type definition for API errors
export interface ApiErrorResponse {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: unknown; // For other possible error fields
}
  
export interface AuthResponse {
  access: string;
  refresh: string;
  user: Partial<User>
}
export interface DjangoPaginatedResponse<T> {
  
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}