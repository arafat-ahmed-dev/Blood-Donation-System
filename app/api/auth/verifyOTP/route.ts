import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { OtpService } from "@/lib/otp";
import prisma from "@/lib/prisma";
import { authErrors } from "@/lib/api-error-handler";

// Initialize Redis and OTP service
let redis: Redis | null = null;
let otpService: OtpService;
// Initialize Redis and OTP service
try {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    otpService = new OtpService(redis);
  } else {
    otpService = new OtpService(null);
  }
} catch (error) {
  otpService = new OtpService(null);
}

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Ensure OTP is a string and trim whitespace
    const otpString = String(otp).trim();

    const isValid = await otpService.verifyOtp(email, otpString);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }
    const isUserExists = await prisma.donor.findUnique({
      where: { email },
    });
    if (!isUserExists) {
      return authErrors.userNotFound();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
