"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, ChevronRight, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { decrypt } from "@/lib/data-encryption-utils";
import { useAuth } from "@/components/auth/auth-provider";
import { useAuthErrorToast } from "@/lib/auth-errors";
import axios from "axios";
import AuthErrorHandler from "@/components/auth/AuthErrorHandler";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const inputVariants = {
  focused: {
    scale: 1.05,
    borderColor: "#ef4444",
    boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.2)",
  },
  unfocused: { scale: 1, borderColor: "#e5e7eb", boxShadow: "none" },
  filled: {
    scale: 1,
    borderColor: "#ef4444",
    boxShadow: "0 0 0 1px rgba(239, 68, 68, 0.3)",
  },
  error: {
    scale: [1, 1.05, 1],
    borderColor: "#ef4444",
    boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.4)",
  },
};

const successIconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const pulseVariant = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 1.5,
    },
  },
};

// Custom hook for detecting triple clicks
function useTripleClick(callback: () => void) {
  const clickTimesRef = useRef<number[]>([]);

  useEffect(() => {
    const handleClick = () => {
      const now = new Date().getTime();
      const clickTimes = [...clickTimesRef.current, now];

      // Keep only the last 3 click times
      if (clickTimes.length > 3) {
        clickTimes.shift();
      }

      clickTimesRef.current = clickTimes;

      // Check if we have 3 clicks within 500ms
      if (clickTimes.length === 3 && clickTimes[2] - clickTimes[0] < 500) {
        callback();
      }
    };

    return () => {
      clickTimesRef.current = [];
    };
  }, [callback]);

  return {
    onClick: useCallback(() => {
      const now = new Date().getTime();
      clickTimesRef.current = [...clickTimesRef.current, now];
    }, []),
  };
}

export default function VerifyOtpForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [otpTimer, setOtpTimer] = useState(300); // 5 minutes in seconds
  const [otpExpired, setOtpExpired] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const { toast } = useToast();
  const { handleApiError, showAuthError } = useAuthErrorToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);
  const redirectPath = searchParams.get("redirect") || "/profile";

  // Use the triple click hook for debug panel
  const toggleDebug = useCallback(() => setShowDebug(!showDebug), [showDebug]);
  const { onClick: handleDebugClick } = useTripleClick(toggleDebug);

  // If no email or temp token is available, redirect to registration
  useEffect(() => {
    if (!email || !token) {
      showAuthError("verification", "Missing verification details");
      router.push("/auth");
    }
  }, [email, token, router, showAuthError]);

  // Initialize the array with 6 null values for 6 input fields
  useEffect(() => {
    otpInputs.current = otpInputs.current.slice(0, 6);
    while (otpInputs.current.length < 6) {
      otpInputs.current.push(null);
    }

    // Start the OTP expiration timer
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOtpExpired(true);
          toast({
            variant: "destructive",
            title: "OTP Expired",
            description:
              "Your verification code has expired. Please request a new one.",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Start resend countdown
    const resendTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(resendTimer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-focus first input field
    if (otpInputs.current[0]) {
      setTimeout(() => {
        otpInputs.current[0]?.focus();
        setFocusedInput(0);
      }, 500);
    }

    // Cleanup timers on unmount
    return () => {
      clearInterval(timer);
      clearInterval(resendTimer);
    };
  }, []);

  const handleResendCode = async () => {
    if (resendDisabled) return;

    if (!email) {
      toast({
        variant: "destructive",
        title: "Verification error",
        description: "Missing email information. Please register again.",
      });
      router.push("/auth");
      return;
    }

    setIsLoading(true);
    setLastError(null);
    try {
      // Verify token
      console.log("Resending code to:", email);

      const response = await axios.post("/api/auth/generateOTP", {
        email,
      });

      if (response.data.success) {
        toast({
          title: "Code resent",
          description: `A new verification code has been sent to ${email}`,
        });

        // Reset OTP expiration timer
        setOtpTimer(300); // Reset to 5 minutes
        setOtpExpired(false);

        // Clear input fields
        otpInputs.current.forEach((input) => {
          if (input) input.value = "";
        });
        setOtp("");

        // Disable the resend button and start countdown
        setResendDisabled(true);
        setCountdown(60);

        // If token has changed, update URL
        if (response.data.tempToken && response.data.tempToken !== token) {
          router.push(
            `/verify?email=${encodeURIComponent(
              email
            )}&token=${encodeURIComponent(
              response.data.tempToken
            )}&redirect=${encodeURIComponent(redirectPath)}`
          );
        }
      } else if (response.data.message) {
        // Handle explicit error message from backend
        setLastError(response.data.message);

        // Let AuthErrorHandler handle this through URL params
        router.push(
          `/verify?email=${encodeURIComponent(
            email
          )}&token=${encodeURIComponent(token)}&redirect=${encodeURIComponent(
            redirectPath
          )}&error=default&error_message=${encodeURIComponent(
            response.data.message
          )}`
        );
      }
    } catch (error) {
      console.error("Error in handleResendCode:", error);

      if (axios.isAxiosError(error)) {
        // Extract error message from the response data
        const errorResponse = error.response?.data;
        console.log("Full error response:", errorResponse);

        let errorMessage = "Failed to resend verification code";
        let errorType = "default";

        // Extract error message from our standard API error format
        if (errorResponse?.error?.message) {
          errorMessage = errorResponse.error.message;
          errorType = errorResponse.error.code || "default";
          console.log("API error code:", errorResponse.error.code);
        } else if (errorResponse?.message) {
          errorMessage = errorResponse.message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        setLastError(errorMessage);

        // Let AuthErrorHandler handle this through URL params
        router.push(
          `/verify?email=${encodeURIComponent(
            email
          )}&token=${encodeURIComponent(token)}&redirect=${encodeURIComponent(
            redirectPath
          )}&error=${encodeURIComponent(
            errorType
          )}&error_message=${encodeURIComponent(errorMessage)}`
        );
      } else {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";

        console.error("Non-Axios error:", error);

        setLastError(errorMessage);

        // Let AuthErrorHandler handle this through URL params
        router.push(
          `/verify?email=${encodeURIComponent(
            email
          )}&token=${encodeURIComponent(token)}&redirect=${encodeURIComponent(
            redirectPath
          )}&error=default&error_message=${encodeURIComponent(errorMessage)}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Update the current input
    if (otpInputs.current[index]) {
      otpInputs.current[index]!.value = value;
    }

    // Move to next input if value is entered
    if (value && index < 5 && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1]!.focus();
      setFocusedInput(index + 1);
    }

    // Update the OTP value
    const newOtp = otpInputs.current
      .map((input) => input?.value || "")
      .join("");

    setOtp(newOtp);
  };

  const handleInputFocus = (index: number) => {
    setFocusedInput(index);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (
        !otpInputs.current[index]?.value &&
        index > 0 &&
        otpInputs.current[index - 1]
      ) {
        otpInputs.current[index - 1]!.focus();
        setFocusedInput(index - 1);
      }
    }

    // Handle left arrow key
    if (e.key === "ArrowLeft" && index > 0 && otpInputs.current[index - 1]) {
      otpInputs.current[index - 1]!.focus();
      setFocusedInput(index - 1);
    }

    // Handle right arrow key
    if (e.key === "ArrowRight" && index < 5 && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1]!.focus();
      setFocusedInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted content is a valid 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      for (let i = 0; i < 6; i++) {
        if (otpInputs.current[i]) {
          otpInputs.current[i]!.value = pastedData[i];
        }
      }

      setOtp(pastedData);

      // Focus the last input after paste
      if (otpInputs.current[5]) {
        otpInputs.current[5]!.focus();
        setFocusedInput(5);
      }
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (otpExpired) {
      toast({
        variant: "destructive",
        title: "OTP Expired",
        description:
          "Your verification code has expired. Please request a new one.",
      });
      return;
    }

    if (!email || !token) {
      toast({
        variant: "destructive",
        title: "Verification error",
        description: "Missing verification information. Please register again.",
      });
      router.push("/auth");
      return;
    }

    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid code",
        description: "Please enter a valid 6-digit verification code",
      });
      return;
    }

    setIsLoading(true);
    setLastError(null);
    try {
      // Verify token
      const decryptData = decrypt(token) as string;
      const isTempTokenValid = decryptData === email;

      if (!isTempTokenValid) {
        const errorMsg = "Invalid temporary token. Please request a new one.";
        setLastError(errorMsg);

        // Let AuthErrorHandler handle this through URL params
        router.push(
          `/verify?email=${encodeURIComponent(
            email
          )}&error=invalid_token&error_message=${encodeURIComponent(errorMsg)}`
        );
        return;
      }

      // Submit OTP for verification
      const response = await axios.post("/api/auth/verifyOTP", {
        otp,
        email,
      });

      if (response.data.success) {
        // Show success animation before redirecting
        setVerificationSuccess(true);

        toast({
          title: "Verification successful",
          description: "Your account has been verified",
        });

        // Wait for animation to complete before redirecting
        setTimeout(async () => {
          await login(email, redirectPath);

          toast({
            title: "Email verified",
            description: "Your email has been successfully verified.",
          });

          router.push(redirectPath);
        }, 2000);
      } else if (response.data.message) {
        // Handle explicit error message from backend
        setLastError(response.data.message);

        // Let AuthErrorHandler handle this through URL params
        router.push(
          `/verify?email=${encodeURIComponent(
            email
          )}&token=${encodeURIComponent(token)}&redirect=${encodeURIComponent(
            redirectPath
          )}&error=otp&error_message=${encodeURIComponent(
            response.data.message
          )}`
        );
      }
    } catch (error) {
      console.error("Error in verify OTP:", error);

      if (axios.isAxiosError(error)) {
        // Extract error message from the response data
        const errorResponse = error.response?.data;
        console.log("Full error response:", errorResponse);

        let errorMessage = "Failed to verify code";
        let errorType = "otp";

        // Extract error message from our standard API error format
        if (errorResponse?.error?.message) {
          errorMessage = errorResponse.error.message;
          errorType = errorResponse.error.code || "otp";
          console.log("API error code:", errorResponse.error.code);
        } else if (errorResponse?.message) {
          errorMessage = errorResponse.message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        setLastError(errorMessage);

        // Let AuthErrorHandler handle this through URL params
        router.push(
          `/verify?email=${encodeURIComponent(
            email
          )}&token=${encodeURIComponent(token)}&redirect=${encodeURIComponent(
            redirectPath
          )}&error=${encodeURIComponent(
            errorType
          )}&error_message=${encodeURIComponent(errorMessage)}`
        );
      } else {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";

        console.error("Non-Axios error:", error);

        setLastError(errorMessage);

        // Let AuthErrorHandler handle this through URL params
        router.push(
          `/verify?email=${encodeURIComponent(
            email
          )}&token=${encodeURIComponent(token)}&redirect=${encodeURIComponent(
            redirectPath
          )}&error=otp&error_message=${encodeURIComponent(errorMessage)}`
        );
      }
    } finally {
      if (!verificationSuccess) {
        setIsLoading(false);
      }
    }
  }

  // Calculate progress percentage for timer
  const timerProgress = (otpTimer / 300) * 100;

  return (
    <>
      <AuthErrorHandler />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container px-4 py-6 md:py-12 min-h-screen flex items-center justify-center"
      >
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {verificationSuccess ? (
              <motion.div
                key="success"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-xl shadow-lg"
              >
                <motion.div
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white p-5 md:p-6 rounded-full mb-6"
                  variants={successIconVariants}
                >
                  <CheckCircle className="h-10 w-10 md:h-12 md:w-12" />
                </motion.div>
                <motion.h1
                  className="text-2xl md:text-3xl font-bold text-gray-800 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Verification Successful!
                </motion.h1>
                <motion.p
                  className="text-gray-600 text-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Redirecting you to your profile...
                </motion.p>
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="verification" variants={fadeIn}>
                <div className="flex flex-col items-center mb-6 md:mb-8">
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 md:p-4 rounded-full mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <CheckCircle className="h-8 w-8 md:h-10 md:w-10" />
                  </motion.div>
                  <motion.h1
                    className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Verify Your Email
                  </motion.h1>
                  <motion.p
                    className="text-gray-600 text-center mt-2 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Almost there! Complete your registration
                  </motion.p>
                </div>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
                  <form onSubmit={onSubmit}>
                    <CardContent className="p-4 md:pt-6">
                      <motion.div
                        className="mb-6 md:mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                          Enter Verification Code
                        </h2>
                        <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                          We've sent a verification code to{"\n"}
                          <span className="font-medium text-red-600 break-all">
                            {email}
                          </span>
                        </p>

                        <div className="mt-4 md:mt-5 relative">
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-red-500 to-red-600"
                              initial={{ width: "100%" }}
                              animate={{ width: `${timerProgress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <motion.div
                              variants={pulseVariant}
                              animate={otpTimer < 60 ? "pulse" : ""}
                              className={`flex items-center ${
                                otpTimer < 60 ? "text-red-500" : "text-gray-600"
                              }`}
                            >
                              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                              <span className="text-xs md:text-sm font-medium">
                                {otpExpired
                                  ? "Expired"
                                  : `${Math.floor(otpTimer / 60)}:${(
                                      otpTimer % 60
                                    )
                                      .toString()
                                      .padStart(2, "0")}`}
                              </span>
                            </motion.div>

                            {otpTimer < 60 && !otpExpired && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-red-500"
                              >
                                <AlertCircle className="h-3 w-3 inline mr-1" />{" "}
                                Expiring soon
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                        Verification Code
                      </label>
                      <motion.div
                        className="flex justify-between mb-6 md:mb-8 gap-1 md:gap-2"
                        onPaste={handlePaste}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {[...Array(6)].map((_, index) => (
                          <motion.div
                            key={index}
                            initial="unfocused"
                            animate={
                              focusedInput === index
                                ? "focused"
                                : otpInputs.current[index]?.value
                                ? "filled"
                                : "unfocused"
                            }
                            variants={inputVariants}
                            whileHover={{ scale: 1.03 }}
                            className="relative flex-1"
                          >
                            <input
                              ref={(el) => {
                                otpInputs.current[index] = el;
                              }}
                              type="text"
                              maxLength={1}
                              className="w-full h-12 md:h-14 text-center text-lg md:text-xl font-bold border rounded-lg transition-all focus:outline-none"
                              onChange={(e) =>
                                handleInputChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              onFocus={() => handleInputFocus(index)}
                              onBlur={handleInputBlur}
                              autoComplete={
                                index === 0 ? "one-time-code" : "off"
                              }
                            />
                          </motion.div>
                        ))}
                      </motion.div>

                      <motion.div
                        className="text-center mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-xs md:text-sm text-gray-600 mb-1">
                          Didn't receive a code?
                        </p>
                        <motion.button
                          type="button"
                          onClick={handleResendCode}
                          className="text-red-500 font-medium text-xs md:text-sm hover:text-red-600 focus:outline-none disabled:text-gray-400"
                          disabled={resendDisabled}
                          whileHover={{ scale: resendDisabled ? 1 : 1.05 }}
                          whileTap={{ scale: resendDisabled ? 1 : 0.95 }}
                        >
                          {resendDisabled ? (
                            <span>
                              Resend Code in{" "}
                              <span className="font-bold">{countdown}s</span>
                            </span>
                          ) : (
                            <span>Resend Code</span>
                          )}
                        </motion.button>
                      </motion.div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 p-4 md:p-6 pt-0 md:pt-0">
                      <motion.div
                        className="w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{
                          scale:
                            isLoading || otp.length !== 6 || otpExpired
                              ? 1
                              : 1.02,
                        }}
                        whileTap={{
                          scale:
                            isLoading || otp.length !== 6 || otpExpired
                              ? 1
                              : 0.98,
                        }}
                      >
                        <Button
                          type="submit"
                          className="w-full py-4 md:py-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium text-base md:text-lg transition-all"
                          disabled={isLoading || otp.length !== 6 || otpExpired}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              <span>Verifying...</span>
                            </div>
                          ) : otpExpired ? (
                            "Request New Code"
                          ) : (
                            <div className="flex items-center justify-center">
                              <span>Verify & Continue</span>
                              <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                  duration: 1,
                                }}
                              >
                                <ChevronRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
                              </motion.div>
                            </div>
                          )}
                        </Button>
                      </motion.div>

                      <motion.p
                        className="text-xs text-gray-600 text-center px-1 md:px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        By verifying your email, you're creating a Blood Donor
                        account and agreeing to our{" "}
                        <Link
                          href="/terms"
                          className="text-red-500 hover:underline font-medium"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-red-500 hover:underline font-medium"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </motion.p>

                      {/* Debug section - triple click anywhere on form to toggle */}
                      <div
                        className="mt-4 text-xs"
                        onClick={handleDebugClick}
                        data-triple-click="true"
                      >
                        {showDebug && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-auto max-h-40"
                          >
                            <div className="font-bold mb-1">
                              Debug Information:
                            </div>
                            {lastError && (
                              <div className="text-red-500 mb-1">
                                <span className="font-semibold">
                                  Last Error:
                                </span>{" "}
                                {lastError}
                              </div>
                            )}
                            <div>
                              <span className="font-semibold">Email:</span>{" "}
                              {email}
                            </div>
                            <div>
                              <span className="font-semibold">Token:</span>{" "}
                              {token ? `${token.substring(0, 10)}...` : "None"}
                            </div>
                            <div>
                              <span className="font-semibold">OTP:</span>{" "}
                              {otp || "Not entered"}
                            </div>
                            <div>
                              <span className="font-semibold">Timer:</span>{" "}
                              {otpTimer}s
                            </div>
                            <div>
                              <span className="font-semibold">Expired:</span>{" "}
                              {otpExpired ? "Yes" : "No"}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </CardFooter>
                  </form>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
