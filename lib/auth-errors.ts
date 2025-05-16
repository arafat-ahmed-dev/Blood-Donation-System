// utils/auth-errors.ts
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";

// Define common error types
export type AuthErrorType =
  | "default"
  | "credentials"
  | "email"
  | "server"
  | "verification"
  | "registration"
  | "network"
  | "otp";

// Icon types for toast
export type IconType =
  | "alert-circle"
  | "alert-triangle"
  | "info"
  | "x-circle"
  | "check-circle";

// Mapping of error types to user-friendly messages
const errorMessages: Record<AuthErrorType, string> = {
  default: "An authentication error occurred. Please try again.",
  credentials: "Invalid email or password. Please check your credentials.",
  email: "There was a problem with your email address.",
  server: "Server error. Please try again later.",
  verification: "Verification failed. Please request a new verification code.",
  registration: "Registration failed. This email may already be registered.",
  network: "Network error. Please check your connection and try again.",
  otp: "Invalid or expired verification code. Please request a new one.",
};

// Keep track of recent errors to prevent duplicates
const recentErrors = new Set<string>();
const ERROR_PREVENTION_TIME = 5000; // 5 seconds

// Error handler hook to use across components
export function useAuthErrorToast() {
  const { toast } = useToast();

  // Show error toast with appropriate message
  const showAuthError = React.useCallback(
    (errorType: AuthErrorType = "default", customMessage?: string) => {
      const message = customMessage || errorMessages[errorType];
      const errorKey = `${errorType}:${message}`;

      // Skip if this exact error was shown recently
      if (recentErrors.has(errorKey)) {
        console.log("Prevented duplicate auth error toast:", errorKey);
        return;
      }

      // Add to recent errors
      recentErrors.add(errorKey);
      setTimeout(() => {
        recentErrors.delete(errorKey);
      }, ERROR_PREVENTION_TIME);

      // Get appropriate icon based on error type
      let iconType: IconType = "alert-circle";

      switch (errorType) {
        case "server":
          iconType = "x-circle";
          break;
        case "network":
          iconType = "alert-triangle";
          break;
        case "verification":
        case "otp":
          iconType = "info";
          break;
      }

      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: message,
        icon: iconType,
        duration: 6000, // Slightly longer for auth errors
      });
    },
    [toast]
  );

  // Parse API error responses
  const handleApiError = React.useCallback(
    (error: any) => {
      // Handle axios errors
      if (error?.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || error.response.data?.error?.message;

        // Match status codes to appropriate error types
        if (status === 401) {
          showAuthError("credentials", message);
        } else if (status === 404) {
          showAuthError("email", message);
        } else if (status === 429) {
          showAuthError(
            "default",
            "Too many attempts. Please try again later."
          );
        } else if (status >= 500) {
          showAuthError("server", message);
        } else {
          showAuthError("default", message);
        }
      }
      // Handle network errors
      else if (error?.request) {
        showAuthError("network");
      }
      // Handle other errors
      else {
        showAuthError("default", error?.message);
      }
    },
    [showAuthError]
  );

  return {
    showAuthError,
    handleApiError,
  };
}

// Helper function for when you don't need the hook
export function showGlobalAuthError(
  toast: any,
  errorType: AuthErrorType = "default",
  customMessage?: string
) {
  const message = customMessage || errorMessages[errorType];
  const errorKey = `${errorType}:${message}`;

  // Skip if this exact error was shown recently
  if (recentErrors.has(errorKey)) {
    console.log("Prevented duplicate global auth error toast:", errorKey);
    return;
  }

  // Add to recent errors
  recentErrors.add(errorKey);
  setTimeout(() => {
    recentErrors.delete(errorKey);
  }, ERROR_PREVENTION_TIME);

  // Get appropriate icon based on error type
  let iconType: IconType = "alert-circle";

  switch (errorType) {
    case "server":
      iconType = "x-circle";
      break;
    case "network":
      iconType = "alert-triangle";
      break;
    case "verification":
    case "otp":
      iconType = "info";
      break;
  }

  toast({
    variant: "destructive",
    title: "Authentication Error",
    description: message,
    icon: iconType,
    duration: 6000,
  });
}
