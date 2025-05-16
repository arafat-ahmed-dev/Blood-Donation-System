import { NextResponse } from "next/server";
import Redis from "ioredis";
import { OtpService } from "@/lib/otp";
import prisma from "@/lib/prisma";
import { authErrors } from "@/lib/api-error-handler";

// Initialize Redis and OTP service
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
const otpService = new OtpService(redis);

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
