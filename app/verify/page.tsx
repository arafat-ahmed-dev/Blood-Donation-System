"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Verify() {
    const [isLoading, setIsLoading] = useState(false)
    const [resendDisabled, setResendDisabled] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const [otpTimer, setOtpTimer] = useState(300) // 5 minutes in seconds
    const [otpExpired, setOtpExpired] = useState(false)
    const [otp, setOtp] = useState("")
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email') || ""
    const tempToken = searchParams.get('token') || ""
    const otpInputs = useRef<(HTMLInputElement | null)[]>([])

    // If no email or temp token is available, redirect to registration
    useEffect(() => {
        if (!email || !tempToken) {
            toast({
                variant: "destructive",
                title: "Verification error",
                description: "Missing verification information. Please register again.",
            })
            router.push('/auth')
        }
    }, [email, tempToken, router, toast])

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
                        description: "Your verification code has expired. Please request a new one.",
                    });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Cleanup timer on unmount
        return () => clearInterval(timer);
    }, []);

    const handleResendCode = async () => {
        if (resendDisabled) return;

        if (!email || !tempToken) {
            toast({
                variant: "destructive",
                title: "Verification error",
                description: "Missing verification information. Please register again.",
            });
            router.push('/auth');
            return;
        }

        setIsLoading(true);
        try {
            // Call the resend OTP API with temporary token
            const response = await fetch('/api/resendOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    token: tempToken
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: "Code resent",
                    description: `A new verification code has been sent to ${email}`,
                });

                // Reset OTP expiration timer
                setOtpTimer(300); // Reset to 5 minutes
                setOtpExpired(false);

                // Clear input fields
                otpInputs.current.forEach(input => {
                    if (input) input.value = "";
                });
                setOtp("");

                // Disable the resend button for 60 seconds
                setResendDisabled(true);
                setCountdown(60);

                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setResendDisabled(false);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                toast({
                    variant: "destructive",
                    title: "Failed to resend code",
                    description: data.message || "Please try again later.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to resend verification code. Please try again.",
            });
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
        }

        // Update the OTP value
        const newOtp = otpInputs.current
            .map(input => input?.value || "")
            .join("");

        setOtp(newOtp);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === "Backspace") {
            if (!otpInputs.current[index]?.value && index > 0 && otpInputs.current[index - 1]) {
                otpInputs.current[index - 1]!.focus();
            }
        }

        // Handle left arrow key
        if (e.key === "ArrowLeft" && index > 0 && otpInputs.current[index - 1]) {
            otpInputs.current[index - 1]!.focus();
        }

        // Handle right arrow key
        if (e.key === "ArrowRight" && index < 5 && otpInputs.current[index + 1]) {
            otpInputs.current[index + 1]!.focus();
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
            }
        }
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (otpExpired) {
            toast({
                variant: "destructive",
                title: "OTP Expired",
                description: "Your verification code has expired. Please request a new one.",
            });
            return;
        }

        if (!email || !tempToken) {
            toast({
                variant: "destructive",
                title: "Verification error",
                description: "Missing verification information. Please register again.",
            });
            router.push('/auth');
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

        setIsLoading(true)
        try {
            const response = await fetch('/api/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp,
                    token: tempToken
                }),
            })

            const data = await response.json()

            if (response.ok) {
                toast({
                    title: "Verification successful",
                    description: data.message || "Your account has been verified.",
                })

                // Store the actual auth token (not temporary token) that should be returned from verification
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }

                // Redirect to login or directly to dashboard after successful verification
                router.push(data.redirectUrl || '/profile');
            } else {
                toast({
                    variant: "destructive",
                    title: "Verification failed",
                    description: data.message || "Please check your code and try again.",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Verification failed",
                description: "An unexpected error occurred. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container py-12">
            <div className="w-full max-w-md mx-auto">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-red-500 text-white p-3 rounded-full mb-4">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-red-500 text-center">Verify Your Email</h1>
                    <p className="text-gray-600 text-center mt-1">Almost there! Complete your registration</p>
                </div>

                <Card className="border-0 shadow-md">
                    <form onSubmit={onSubmit}>
                        <CardContent className="pt-6">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Enter Verification Code</h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    We've sent a verification code to {email}
                                </p>
                                <div className="mt-3 flex items-center justify-center">
                                    <div className={`flex items-center ${otpTimer < 60 ? 'text-red-500' : 'text-gray-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            {otpExpired ? 'Expired' : `${Math.floor(otpTimer / 60)}:${(otpTimer % 60).toString().padStart(2, '0')}`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Verification Code
                            </label>
                            <div
                                className="flex justify-between mb-6 gap-2"
                                onPaste={handlePaste}
                            >
                                {[...Array(6)].map((_, index) => (
                                    <input
                                        key={index}
                                        ref={el => { otpInputs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        className="w-full h-12 text-center text-xl border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        autoComplete={index === 0 ? "one-time-code" : "off"}
                                    />
                                ))}
                            </div>

                            <div className="text-center mb-4">
                                <p className="text-sm text-gray-600">Didn't receive a code?</p>
                                <button
                                    type="button"
                                    onClick={handleResendCode}
                                    className="text-red-500 font-medium text-sm hover:text-red-600 focus:outline-none disabled:text-gray-400"
                                    disabled={resendDisabled}
                                >
                                    {resendDisabled ? `Resend Code (${countdown}s)` : "Resend Code"}
                                </button>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4">
                            <Button
                                type="submit"
                                className="w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-md font-medium"
                                disabled={isLoading || otp.length !== 6 || otpExpired}
                            >
                                {isLoading ? "Verifying..." : otpExpired ? "Request New Code" : "Verify & Continue"}
                            </Button>

                            <p className="text-xs text-gray-600 text-center px-4">
                                By verifying your email, you're creating a Blood Donor account and agreeing to our{" "}
                                <Link href="/terms" className="text-red-500 hover:underline">Terms of Service</Link> and{" "}
                                <Link href="/privacy" className="text-red-500 hover:underline">Privacy Policy</Link>.
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}