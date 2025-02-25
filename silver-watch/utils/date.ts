import { format } from "date-fns";

/**
 * Formats a date-time string into a human-readable format.
 * @param dateString - The date-time string to format.
 * @param style - The format style (default: "medium").
 * @returns Formatted date-time.
 */
export function formatDateTime(
  dateString: string,
  style: "short" | "medium" | "long" | "full" = "medium"
): string {
  const formats = {
    short: "MM/dd/yyyy", // Example: 02/16/2025
    medium: "MMM d, yyyy h:mm a", // Example: Feb 16, 2025 10:30 AM
    long: "MMMM d, yyyy h:mm a", // Example: February 16, 2025 10:30 AM
    full: "EEEE, MMMM d, yyyy h:mm a", // Example: Sunday, February 16, 2025 10:30 AM
  };

  return format(new Date(dateString), formats[style]);
}
