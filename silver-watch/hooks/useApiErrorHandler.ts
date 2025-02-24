import { toast } from "sonner"; // Or any other toast library like react-toastify

// Define API error response structure
export interface ApiErrorResponse {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: unknown; // Other field-specific errors
}

// Type guard to check if an error is an ApiErrorResponse
function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return typeof error === "object" && error !== null;
}

// Custom hook for handling API errors
export function useApiErrorHandler() {
  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message);
    } else if (isApiErrorResponse(error)) {
      if (error.non_field_errors && Array.isArray(error.non_field_errors)) {
        // Handle non_field_errors (e.g., login failure)
        error.non_field_errors.forEach((msg) => toast.error(msg));
      } else if (error.detail) {
        // Handle generic API error messages
        toast.error(error.detail);
      } else {
        // Handle other field-specific errors dynamically
        for (const key in error) {
          if (typeof error[key] === "string") {
            toast.error(`${key}: ${error[key]}`);
          } else if (Array.isArray(error[key])) {
            (error[key] as string[]).forEach((msg) => toast.error(`${key}: ${msg}`));
          }
        }
      }
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return { handleError };
}
