"use client";

import { toast } from "@/components/ui/use-toast";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Mail,
  Shield,
  Users,
  Heart,
  Clock,
} from "lucide-react";

// Define toast types for better type safety
export type ToastType = "success" | "error" | "warning" | "info" | "loading";

// Define specific context types for the blood donation system
export type BloodDonationContext =
  | "auth"
  | "verification"
  | "donation"
  | "appointment"
  | "profile"
  | "admin"
  | "blood-request"
  | "inventory"
  | "notification"
  | "general";

// Custom toast configuration interface
interface CustomToastConfig {
  title?: string;
  description: string;
  duration?: number;
  action?: any;
  context?: BloodDonationContext;
}

// Predefined durations for different toast types
const TOAST_DURATIONS = {
  success: 4000,
  error: 6000,
  warning: 5000,
  info: 4000,
  loading: Infinity,
} as const;

// Icon mapping for different contexts
const CONTEXT_ICONS = {
  auth: Shield,
  verification: Mail,
  donation: Heart,
  appointment: Clock,
  profile: Users,
  admin: Shield,
  "blood-request": Heart,
  inventory: Users,
  notification: Info,
  general: Info,
} as const;

// Utility function to get appropriate icon for context
const getContextIcon = (
  context: BloodDonationContext,
  type: ToastType
): string => {
  if (type === "success") return "✅";
  if (type === "error") return "❌";
  if (type === "warning") return "⚠️";
  if (type === "loading") return "⏳";

  const contextEmojis = {
    auth: "🔐",
    verification: "📧",
    donation: "❤️",
    appointment: "📅",
    profile: "👤",
    admin: "⚙️",
    "blood-request": "🩸",
    inventory: "📦",
    notification: "ℹ️",
    general: "ℹ️",
  };

  return contextEmojis[context] || "ℹ️";
};

// Custom toast utility class
class CustomToast {
  /**
   * Show a success toast
   */
  static success(config: CustomToastConfig) {
    const icon = getContextIcon(config.context || "general", "success");

    return toast({
      title: config.title || "Success!",
      description: `${icon} ${config.description}`,
      variant: "default",
      duration: config.duration || TOAST_DURATIONS.success,
      action: config.action,
    });
  }

  /**
   * Show an error toast
   */
  static error(config: CustomToastConfig) {
    const icon = getContextIcon(config.context || "general", "error");

    return toast({
      title: config.title || "Error",
      description: `${icon} ${config.description}`,
      variant: "destructive",
      duration: config.duration || TOAST_DURATIONS.error,
      action: config.action,
    });
  }

  /**
   * Show a warning toast
   */
  static warning(config: CustomToastConfig) {
    const icon = getContextIcon(config.context || "general", "warning");

    return toast({
      title: config.title || "Warning",
      description: `${icon} ${config.description}`,
      variant: "default",
      duration: config.duration || TOAST_DURATIONS.warning,
      action: config.action,
    });
  }

  /**
   * Show an info toast
   */
  static info(config: CustomToastConfig) {
    const icon = getContextIcon(config.context || "general", "info");

    return toast({
      title: config.title || "Information",
      description: `${icon} ${config.description}`,
      variant: "default",
      duration: config.duration || TOAST_DURATIONS.info,
      action: config.action,
    });
  }

  /**
   * Show a loading toast
   */
  static loading(config: CustomToastConfig) {
    const icon = getContextIcon(config.context || "general", "loading");

    return toast({
      title: config.title || "Loading...",
      description: `${icon} ${config.description}`,
      variant: "default",
      duration: config.duration || TOAST_DURATIONS.loading,
      action: config.action,
    });
  }

  // Specialized methods for blood donation system contexts

  /**
   * Authentication related toasts
   */
  static auth = {
    loginSuccess: () =>
      CustomToast.success({
        title: "Welcome Back!",
        description: "You have successfully logged in.",
        context: "auth",
      }),

    loginError: (message?: string) =>
      CustomToast.error({
        title: "Login Failed",
        description:
          message ||
          "Invalid credentials. Please check your email and password.",
        context: "auth",
      }),

    logoutSuccess: () =>
      CustomToast.success({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        context: "auth",
      }),

    registrationSuccess: () =>
      CustomToast.success({
        title: "Registration Successful!",
        description: "Please check your email to verify your account.",
        context: "auth",
      }),

    passwordReset: () =>
      CustomToast.success({
        title: "Password Reset",
        description:
          "Password reset instructions have been sent to your email.",
        context: "auth",
      }),
  };

  /**
   * Email verification related toasts
   */
  static verification = {
    codeSent: () =>
      CustomToast.success({
        title: "Verification Code Sent",
        description: "A new verification code has been sent to your email.",
        context: "verification",
      }),

    codeExpired: () =>
      CustomToast.error({
        title: "Code Expired",
        description:
          "Your verification code has expired. Please request a new one.",
        context: "verification",
      }),

    codeInvalid: () =>
      CustomToast.error({
        title: "Invalid Code",
        description: "The verification code you entered is incorrect.",
        context: "verification",
      }),

    verificationSuccess: () =>
      CustomToast.success({
        title: "Email Verified!",
        description: "Your account has been verified successfully.",
        context: "verification",
      }),

    tooManyAttempts: () =>
      CustomToast.error({
        title: "Too Many Attempts",
        description: "Please wait before requesting another verification code.",
        context: "verification",
      }),
  };

  /**
   * Donation related toasts
   */
  static donation = {
    scheduled: () =>
      CustomToast.success({
        title: "Donation Scheduled!",
        description: "Your blood donation appointment has been scheduled.",
        context: "donation",
      }),

    completed: () =>
      CustomToast.success({
        title: "Thank You for Donating!",
        description: "Your donation could save up to 3 lives.",
        context: "donation",
      }),

    cancelled: () =>
      CustomToast.info({
        title: "Donation Cancelled",
        description: "Your donation appointment has been cancelled.",
        context: "donation",
      }),

    eligibilityRequired: () =>
      CustomToast.warning({
        title: "Eligibility Check Required",
        description:
          "Please complete the eligibility assessment before donating.",
        context: "donation",
      }),
  };

  /**
   * Appointment related toasts
   */
  static appointment = {
    booked: () =>
      CustomToast.success({
        title: "Appointment Booked!",
        description: "Your appointment has been successfully scheduled.",
        context: "appointment",
      }),

    cancelled: () =>
      CustomToast.info({
        title: "Appointment Cancelled",
        description: "Your appointment has been cancelled.",
        context: "appointment",
      }),

    rescheduled: () =>
      CustomToast.success({
        title: "Appointment Rescheduled",
        description: "Your appointment has been rescheduled successfully.",
        context: "appointment",
      }),

    reminder: () =>
      CustomToast.info({
        title: "Appointment Reminder",
        description: "You have an upcoming donation appointment.",
        context: "appointment",
      }),
  };

  /**
   * Profile related toasts
   */
  static profile = {
    updated: () =>
      CustomToast.success({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
        context: "profile",
      }),

    photoUploaded: () =>
      CustomToast.success({
        title: "Photo Updated",
        description: "Your profile photo has been updated successfully.",
        context: "profile",
      }),

    preferencesUpdated: () =>
      CustomToast.success({
        title: "Preferences Saved",
        description: "Your notification preferences have been updated.",
        context: "profile",
      }),
  };

  /**
   * Blood request related toasts
   */
  static bloodRequest = {
    submitted: () =>
      CustomToast.success({
        title: "Request Submitted",
        description: "Your blood request has been submitted successfully.",
        context: "blood-request",
      }),

    approved: () =>
      CustomToast.success({
        title: "Request Approved",
        description: "Your blood request has been approved.",
        context: "blood-request",
      }),

    fulfilled: () =>
      CustomToast.success({
        title: "Request Fulfilled",
        description: "Your blood request has been fulfilled.",
        context: "blood-request",
      }),

    urgent: () =>
      CustomToast.warning({
        title: "Urgent Blood Needed",
        description: "There's an urgent request for your blood type.",
        context: "blood-request",
      }),
  };

  /**
   * Admin related toasts
   */
  static admin = {
    userApproved: () =>
      CustomToast.success({
        title: "User Approved",
        description: "The donor has been approved successfully.",
        context: "admin",
      }),

    inventoryUpdated: () =>
      CustomToast.success({
        title: "Inventory Updated",
        description: "Blood inventory has been updated.",
        context: "admin",
      }),

    reportGenerated: () =>
      CustomToast.success({
        title: "Report Generated",
        description: "The report has been generated successfully.",
        context: "admin",
      }),
  };

  /**
   * Network and system related toasts
   */
  static system = {
    networkError: () =>
      CustomToast.error({
        title: "Connection Error",
        description:
          "Unable to connect to our servers. Please check your internet connection.",
        context: "general",
        duration: 6000,
      }),

    serverError: () =>
      CustomToast.error({
        title: "Server Error",
        description:
          "Our servers are experiencing issues. Please try again later.",
        context: "general",
        duration: 6000,
      }),

    maintenance: () =>
      CustomToast.warning({
        title: "Scheduled Maintenance",
        description: "The system will be under maintenance shortly.",
        context: "general",
        duration: 8000,
      }),

    updateAvailable: () =>
      CustomToast.info({
        title: "Update Available",
        description: "A new version of the app is available.",
        context: "general",
      }),
  };

  /**
   * Generic method for custom toasts
   */
  static custom(type: ToastType, config: CustomToastConfig) {
    switch (type) {
      case "success":
        return this.success(config);
      case "error":
        return this.error(config);
      case "warning":
        return this.warning(config);
      case "info":
        return this.info(config);
      case "loading":
        return this.loading(config);
      default:
        return this.info(config);
    }
  }
}

// Export the toast utility
export { CustomToast };

// Also export individual methods for convenience
export const showSuccessToast = CustomToast.success;
export const showErrorToast = CustomToast.error;
export const showWarningToast = CustomToast.warning;
export const showInfoToast = CustomToast.info;
export const showLoadingToast = CustomToast.loading;

// Export specialized toast groups
export const authToasts = CustomToast.auth;
export const verificationToasts = CustomToast.verification;
export const donationToasts = CustomToast.donation;
export const appointmentToasts = CustomToast.appointment;
export const profileToasts = CustomToast.profile;
export const bloodRequestToasts = CustomToast.bloodRequest;
export const adminToasts = CustomToast.admin;
export const systemToasts = CustomToast.system;

// Default export
export default CustomToast;
