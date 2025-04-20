"use client";

import type React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const requestOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // const response = await fetch("/api/send-otp", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ "phoneNumber":phoneNumber }),
            // });
            // console.log(response);
            
            // const contentType = response.headers.get("Content-Type");
            // if (!contentType || !contentType.includes("application/json")) {
            //     throw new Error("Unexpected response format");
            // }

            // const data = await response.json();
            // console.log(data);
            const response = await axios.post("/api/auth/send-otp", {
                phone : phoneNumber,
            });
            console.log(response);
            const data = response.data;

            if (response.status !== 200) {
                throw new Error(data.error || "Failed to send OTP");
            }

            setStep("otp");
        } catch (err) {
            console.log(err);
            
            setError(axios.isAxiosError(err) && err.response?.data?.error ? err.response.data.error : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                phoneNumber,
                otp,
                redirect: false,
            });

            if (result?.error) {
                throw new Error(result.error || "Invalid OTP");
            }

            router.push("/");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Login to Rokto</CardTitle>
                    <CardDescription className="text-center">
                        Enter your phone number to receive an OTP
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === "phone" ? (
                        <form onSubmit={requestOTP} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+880XXXXXXXXXX"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={verifyOTP} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Enter OTP</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    maxLength={6}
                                />
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Verifying..." : "Verify OTP"}
                            </Button>
                            <Button
                                type="button"
                                variant="link"
                                className="w-full"
                                onClick={() => setStep("phone")}
                            >
                                Back to Phone Number
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link href="/auth/register" className="text-primary hover:underline">
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
