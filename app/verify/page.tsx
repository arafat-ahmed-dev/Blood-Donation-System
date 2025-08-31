"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  ChevronRight,
  Clock,
  AlertCircle,
  Shield,
  Mail,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuthErrorToast } from '@/lib/auth-errors';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { CustomToast, verificationToasts, systemToasts } from '@/lib/custom-toast';
import { useAuth } from "@/components/auth/auth-provider";

// Configuration constants
const CONFIG = {
  OTP_LENGTH: 6,
  OTP_EXPIRY_SECONDS: 300, // 5 minutes
  RESEND_COOLDOWN_SECONDS: 60, // 1 minute
  AUTO_FOCUS_DELAY: 100,
  SUCCESS_REDIRECT_DELAY: 2000,
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const inputVariants = {
  unfocused: { borderColor: "#e5e7eb", scale: 1 },
  focused: { borderColor: "#ef4444", scale: 1.02 },
  filled: { borderColor: "#10b981", scale: 1 }
};

const successIconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      duration: 0.6
    }
  }
};

const pulseVariant = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 1, repeat: Infinity }
  }
};

// Utility functions
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};


export default function VerifyOtpForm() {
  // Router and search params
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { showAuthError } = useAuthErrorToast();

  // Extract URL parameters
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';
  const redirectPath = searchParams.get('redirect') || '/profile';

  // Component state
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpTimer, setOtpTimer] = useState(CONFIG.OTP_EXPIRY_SECONDS);
  const [otpExpired, setOtpExpired] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [lastError, setLastError] = useState('');
  const [showDebug, setShowDebug] = useState(false);
  const [failureCount, setFailureCount] = useState(0);
  const [otp, setOtp] = useState('');
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const { login } = useAuth();
  // Refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Memoized values
  const timerProgress = useMemo(() => {
    return (otpTimer / CONFIG.OTP_EXPIRY_SECONDS) * 100;
  }, [otpTimer]);

  const isSubmitDisabled = useMemo(() => {
    return isLoading || otp.length !== CONFIG.OTP_LENGTH || otpExpired;
  }, [isLoading, otp.length, otpExpired]);

  // Event handlers
  const handleInputChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    // Auto-advance to next input
    if (value && index < CONFIG.OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [otp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [otp]);

  const handleInputFocus = useCallback((index: number) => {
    setFocusedInput(index);
  }, []);

  const handleInputBlur = useCallback(() => {
    setFocusedInput(null);
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length <= CONFIG.OTP_LENGTH) {
      setOtp(pastedData.padEnd(CONFIG.OTP_LENGTH, ''));
      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, CONFIG.OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  }, []);

  const handleResendCode = useCallback(async () => {
    try {
      setIsLoading(true);
      // API call to resend OTP would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setResendDisabled(true);
      setCountdown(CONFIG.RESEND_COOLDOWN_SECONDS);
      setOtpTimer(CONFIG.OTP_EXPIRY_SECONDS);
      setOtpExpired(false);
      setOtp('');

      verificationToasts.codeSent();
      // Resend Otp
      const sentOTP = await axios.post('/api/auth/generateOTP', { email });
      if (sentOTP?.data?.otp) {
        verificationToasts.codeSent();
      }
    } catch (error) {
      console.log("Resend error:", error);

      let errorMessage = 'Failed to resend verification code. Please try again.';
      let errorTitle = 'Resend Failed';

      if (isAxiosError(error)) {
        if (error.response?.data?.error?.message) {
          errorMessage = error.response.data.error.message;
        } else if (error.response?.status === 429) {
          verificationToasts.tooManyAttempts();
          return;
        } else if (error.response?.status === 404) {
          CustomToast.error({
            title: 'User Not Found',
            description: 'We couldn\'t find your account. Please try registering again.',
            context: 'verification',
          });
          return;
        }
      }

      CustomToast.error({
        title: 'Resend Failed',
        description: errorMessage,
        context: 'verification',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, showAuthError]);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting OTP:", otp);

    if (isSubmitDisabled) return;

    try {
      setIsLoading(true);
      setLastError('');

      // On success
      const response = await axios.post('/api/auth/verifyOTP', { email, otp });
      console.log(response);

      // Show success toast
      verificationToasts.verificationSuccess();

      setVerificationSuccess(true);
      const signInResponse = await login(email, redirectPath);
      return null;

    } catch (error) {
      console.log("Full error object:", error);

      setFailureCount(prev => prev + 1);

      // Extract error message from axios error response
      let errorMessage = 'Verification failed. Please try again.';
      let errorTitle = 'Verification Failed';
      let isNetworkError = false;

      if (isAxiosError(error)) {
        console.log("Axios error response:", error.response);
        console.log("Axios error status:", error.response?.status);
        console.log("Axios error data:", error.response?.data);

        if (error.response?.data) {
          // Handle standardized error responses from your API
          if (error.response.data.error?.message) {
            errorMessage = error.response.data.error.message;
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          }

          // Handle specific status codes with custom titles and messages
          switch (error.response.status) {
            case 400:
              if (error.response.data.error?.message?.includes('Invalid or expired')) {
                verificationToasts.codeExpired();
                return;
              } else if (error.response.data.error?.message?.includes('required')) {
                CustomToast.error({
                  title: 'Missing Information',
                  description: 'Please enter both email and verification code.',
                  context: 'verification',
                });
                return;
              } else {
                verificationToasts.codeInvalid();
                return;
              }
            case 404:
              CustomToast.error({
                title: 'User Not Found',
                description: 'We couldn\'t find an account with this email. Please check your email or register first.',
                context: 'verification',
              });
              return;
            case 429:
              verificationToasts.tooManyAttempts();
              return;
            case 500:
              systemToasts.serverError();
              return;
          }
        } else if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
          systemToasts.networkError();
          return;
        }
      }

      console.log("Final error message:", errorMessage);

      // Fallback for any unhandled errors
      CustomToast.error({
        title: 'Verification Failed',
        description: errorMessage,
        context: 'verification',
      });

      // Still update lastError for debug panel
      setLastError(errorMessage);

      // Don't call showAuthError since we're handling the toast ourselves
    } finally {
      setIsLoading(false);
    }
  }, [isSubmitDisabled, router, redirectPath, showAuthError]);

  const handleDebugClick = useCallback(() => {
    setShowDebug(prev => !prev);
  }, []);

  // Effects
  useEffect(() => {
    // OTP expiration timer
    if (otpTimer > 0 && !otpExpired) {
      const timer = setTimeout(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (otpTimer === 0 && !otpExpired) {
      setOtpExpired(true);
      verificationToasts.codeExpired();
    }
  }, [otpTimer, otpExpired]);

  useEffect(() => {
    // Resend cooldown timer
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  useEffect(() => {
    // Auto-focus first input
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, CONFIG.AUTO_FOCUS_DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Async error boundary to catch auth errors */}
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
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                          <Mail className="h-5 w-5 mr-2 text-red-500" />
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
                              className={`flex items-center ${otpTimer < 60 ? "text-red-500" : "text-gray-600"
                                }`}
                            >
                              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                              <span className="text-xs md:text-sm font-medium">
                                {otpExpired ? "Expired" : formatTime(otpTimer)}
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

                      <label
                        className="block text-sm font-medium text-gray-700 mb-2 md:mb-3"
                        htmlFor="otp-input-group"
                      >
                        Verification Code
                      </label>
                      <div
                        id="otp-description"
                        className="sr-only"
                        aria-live="polite"
                      >
                        Enter the {CONFIG.OTP_LENGTH}-digit verification code sent to your email
                      </div>
                      <motion.div
                        id="otp-input-group"
                        role="group"
                        aria-labelledby="verification-code-label"
                        className="flex justify-between mb-6 md:mb-8 gap-1 md:gap-2"
                        onPaste={handlePaste}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {[...Array(CONFIG.OTP_LENGTH)].map((_, index) => (
                          <motion.div
                            key={index}
                            initial="unfocused"
                            animate={
                              focusedInput === index
                                ? "focused"
                                : inputRefs.current[index]?.value
                                  ? "filled"
                                  : "unfocused"
                            }
                            variants={inputVariants}
                            whileHover={{ scale: 1.03 }}
                            className="relative flex-1"
                          >
                            <input
                              ref={(el) => {
                                inputRefs.current[index] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]"
                              maxLength={1}
                              className="w-full h-12 md:h-14 text-center text-lg md:text-xl font-bold border rounded-lg transition-all focus:outline-none"
                              value={otp[index] || ""}
                              onChange={(e) =>
                                handleInputChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              onFocus={() => handleInputFocus(index)}
                              onPaste={handlePaste}
                              onBlur={handleInputBlur}
                              autoComplete={
                                index === 0 ? "one-time-code" : "off"
                              }
                              aria-label={`Digit ${index + 1} of verification code`}
                              aria-describedby="otp-description"
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
                          scale: isSubmitDisabled ? 1 : 1.02,
                        }}
                        whileTap={{
                          scale: isSubmitDisabled ? 1 : 0.98,
                        }}
                      >
                        <Button
                          type="submit"
                          className="w-full py-4 md:py-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium text-base md:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitDisabled}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
                              <span>Verifying...</span>
                            </div>
                          ) : otpExpired ? (
                            <div className="flex items-center justify-center">
                              <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                              <span>Request New Code</span>
                            </div>
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

                      {/* Helper text for disabled submit button */}
                      {isSubmitDisabled && !isLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-gray-500 text-center"
                        >
                          {otpExpired
                            ? "⏰ Code expired - request a new one"
                            : otp.length !== CONFIG.OTP_LENGTH
                              ? `📝 Enter all ${CONFIG.OTP_LENGTH} digits to continue`
                              : "⌛ Please wait..."}
                        </motion.div>
                      )}

                      {/* Multiple failure help */}
                      {failureCount >= 2 && !verificationSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm"
                        >
                          <div className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-yellow-800 mb-1">Having trouble?</p>
                              <ul className="text-yellow-700 text-xs space-y-1">
                                <li>• Check your email for the latest verification code</li>
                                <li>• Make sure you're entering all 6 digits correctly</li>
                                <li>• Try requesting a new code if the current one has expired</li>
                                <li>• Check your internet connection</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}

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

                      {/* Enhanced Debug Panel - Triple click to toggle */}
                      <div
                        className="mt-4 text-xs select-none"
                        onClick={handleDebugClick}
                        data-triple-click="true"
                        role="button"
                        tabIndex={0}
                        aria-label="Debug panel toggle"
                      >
                        {showDebug && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-auto max-h-48 border border-gray-300 dark:border-gray-600"
                          >
                            <div className="font-bold mb-2 text-blue-600 dark:text-blue-400">
                              🔧 Debug Information
                            </div>
                            {lastError && (
                              <div className="text-red-500 mb-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                                <span className="font-semibold">Last Error:</span> {lastError}
                              </div>
                            )}
                            <div className="space-y-1">
                              <div><span className="font-semibold">Email:</span> {email || "None"} {!email?.trim() && "❌"}</div>
                              <div><span className="font-semibold">Token:</span> {token ? `${token.substring(0, 10)}...` : "None"} {!token && "❌"}</div>
                              <div><span className="font-semibold">OTP:</span> {otp || "Not entered"} ({otp.length}/{CONFIG.OTP_LENGTH}) {otp.length !== CONFIG.OTP_LENGTH && "❌"}</div>
                              <div><span className="font-semibold">OTP Valid:</span> {otp && /^\d+$/.test(otp) ? "Yes ✅" : "No ❌"}</div>
                              <div><span className="font-semibold">Timer:</span> {formatTime(otpTimer)} ({otpTimer}s)</div>
                              <div><span className="font-semibold">Expired:</span> {otpExpired ? "Yes ❌" : "No ✅"}</div>
                              <div><span className="font-semibold">Loading:</span> {isLoading ? "Yes" : "No"}</div>
                              <div><span className="font-semibold">Resend Disabled:</span> {resendDisabled ? "Yes" : "No"}</div>
                              <div><span className="font-semibold">Countdown:</span> {countdown}s</div>
                              <div><span className="font-semibold">Success:</span> {verificationSuccess ? "Yes" : "No"}</div>
                              <div><span className="font-semibold">Submit Disabled:</span> {isSubmitDisabled ? "Yes ❌" : "No ✅"}</div>
                              <div><span className="font-semibold">Failure Count:</span> {failureCount}</div>
                              <div><span className="font-semibold">Network:</span> {navigator.onLine ? "Online ✅" : "Offline ❌"}</div>
                              <div><span className="font-semibold">User Agent:</span> {navigator.userAgent.substring(0, 50)}...</div>
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
