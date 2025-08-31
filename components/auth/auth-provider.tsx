"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthErrorToast } from "@/lib/auth-errors";

// Define proper return types for functions

interface AuthSuccess {
  success: true;
  tempToken: string;
  message?: string;
}

interface AuthError {
  success: false;
  error: string;
}

type AuthResult = AuthSuccess | AuthError;

export function useAuth() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { showAuthError, handleApiError } = useAuthErrorToast();

  const sendOTP = async (email: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/generateOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // Log response for debugging
      console.log("OTP Response:", {
        status: response.status,
        data: data,
      });

      if (!response.ok) {
        // Extract error message from our standard API error format
        const errorMessage =
          data.error?.message || data.message || "Failed to send OTP";
        console.error("API Error:", errorMessage);

        // Map error to appropriate auth error type
        let errorType = "default";
        if (response.status === 404) errorType = "email";
        if (data.error?.code === "user_not_found") errorType = "email";
        if (data.error?.code === "rate_limit") errorType = "default";
        if (data.error?.code === "validation_error") errorType = "email";

        setError(errorMessage);
        showAuthError(errorType as any, errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      }

      return {
        success: true,
        tempToken: data.tempToken,
        message: data.message,
      };
    } catch (err) {
      console.error("Send OTP error:", err);

      // Use general API error handler
      handleApiError(err);

      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, redirect?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: true,
        email,
        callbackUrl: redirect ?? "/",
      });

      if (result?.error) {
        setError(result.error);
        showAuthError("credentials", result.error);
        return false;
      }

      return result;
    } catch (err) {
      const errorMessage = "An unexpected error occurred";
      setError(errorMessage);
      showAuthError("default", errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      // Log response for debugging
      console.log("Register Response:", {
        status: response.status,
        data: data,
      });

      if (!response.ok) {
        // Extract error message from our standard API error format
        const errorMessage =
          data.error?.message || data.message || "Registration failed";
        console.error("API Error:", errorMessage);

        // Map to appropriate auth error type
        let errorType = "registration";
        if (data.error?.code === "email_in_use") errorType = "registration";
        if (data.error?.code === "validation_error") errorType = "default";

        setError(errorMessage);
        showAuthError(errorType as any, errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      }

      return {
        success: true,
        tempToken: data.tempToken,
        message: data.message,
      };
    } catch (err) {
      console.error("Registration error:", err);

      // Use general API error handler
      handleApiError(err);

      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (err) {
      const errorMessage = "Logout failed";
      setError(errorMessage);
      showAuthError("default", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user: session?.user,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading" || isLoading,
    error,
    login,
    register,
    logout,
    sendOTP,
  };
}
