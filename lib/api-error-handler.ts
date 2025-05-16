import { NextResponse } from "next/server";

// Common error types that can be used throughout the API
export enum AuthErrorCode {
  INVALID_CREDENTIALS = "invalid_credentials",
  USER_NOT_FOUND = "user_not_found",
  EMAIL_IN_USE = "email_in_use",
  INVALID_OTP = "invalid_otp",
  OTP_EXPIRED = "otp_expired",
  SERVER_ERROR = "server_error",
  INVALID_TOKEN = "invalid_token",
  RATE_LIMIT = "rate_limit",
  VALIDATION_ERROR = "validation_error",
}

// Type definition for standardized error responses
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// Helper function to create standardized error responses
export function createErrorResponse(
  code: AuthErrorCode | string,
  message: string,
  status: number = 400
): NextResponse<ErrorResponse> {
  // Log all errors for debugging
  console.log(`API Error: [${code}] ${message} (Status: ${status})`);

  return new NextResponse(
    JSON.stringify({
      success: false,
      error: {
        code,
        message,
      },
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

// Common error responses for authentication
export const authErrors = {
  invalidCredentials: () =>
    createErrorResponse(
      AuthErrorCode.INVALID_CREDENTIALS,
      "Invalid email or password",
      401
    ),

  userNotFound: () =>
    createErrorResponse(AuthErrorCode.USER_NOT_FOUND, "User not found", 404),

  emailInUse: () =>
    createErrorResponse(
      AuthErrorCode.EMAIL_IN_USE,
      "Email is already registered",
      409
    ),

  invalidOTP: () =>
    createErrorResponse(
      AuthErrorCode.INVALID_OTP,
      "Invalid verification code",
      401
    ),

  otpExpired: () =>
    createErrorResponse(
      AuthErrorCode.OTP_EXPIRED,
      "Verification code has expired",
      401
    ),

  serverError: (message = "Internal server error") =>
    createErrorResponse(AuthErrorCode.SERVER_ERROR, message, 500),

  invalidToken: () =>
    createErrorResponse(
      AuthErrorCode.INVALID_TOKEN,
      "Invalid or expired token",
      401
    ),

  rateLimitExceeded: () =>
    createErrorResponse(
      AuthErrorCode.RATE_LIMIT,
      "Too many requests. Please try again later",
      429
    ),

  validationError: (message: string) =>
    createErrorResponse(AuthErrorCode.VALIDATION_ERROR, message, 400),
};
