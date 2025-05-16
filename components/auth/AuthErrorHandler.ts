"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAuthErrorToast } from "@/lib/auth-errors";

// Auth error query parameter handler component
// Use this on pages that might receive error query parameters
export function AuthErrorHandler() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { showAuthError } = useAuthErrorToast();

  // Extract error from URL parameters
  const error = searchParams.get("error");
  const errorMessage = searchParams.get("error_message");

  useEffect(() => {
    if (!error) return;

    // Map error codes to error types
    const errorMapping: Record<string, any> = {
      OAuthSignin: "default",
      OAuthCallback: "default",
      OAuthCreateAccount: "registration",
      EmailCreateAccount: "registration",
      Callback: "default",
      OAuthAccountNotLinked: "credentials",
      EmailSignin: "email",
      CredentialsSignin: "credentials",
      SessionRequired: "default",
      invalid_otp: "otp",
      otp_expired: "otp",
      user_not_found: "email",
      invalid_token: "verification",
      rate_limit: "default",
    };

    // Show appropriate error message based on error code
    const errorType = errorMapping[error] || "default";
    showAuthError(errorType, errorMessage || undefined);
  }, [error, errorMessage, showAuthError]);

  // This component doesn't render anything visible
  return null;
}

export default AuthErrorHandler;
