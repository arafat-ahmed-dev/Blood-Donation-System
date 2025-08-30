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
    console.log("Upstash Redis OTP service initialized");
  } else {
    console.log("No Redis credentials provided, using mock OTP service");
    otpService = new OtpService(null);
  }
} catch (error) {
  console.warn("Failed to connect to Redis, using mock OTP service:", error);
  otpService = new OtpService(null);
}

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();
    console.log(email, otp);
    
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const isValid = await otpService.verifyOtp(email, otp);
    console.log("OTP verification result:", isValid);
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
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
