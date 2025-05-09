import { NextResponse } from "next/server";
import Redis from "ioredis";
import { OtpService } from "@/lib/otp";
import prisma from "@/lib/prisma";
import { sendOTPEmail } from "@/lib/email";
import { encrypt } from "@/lib/data-encryption-utils";

// Initialize Redis and OTP service
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
const otpService = new OtpService(redis);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log(email);
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const isUserExists = await prisma.donor.findUnique({
      where: { email },
    });
    if (!isUserExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Generate OTP using the service
    const otp = await otpService.generateAndStoreOtp(email);

    // Send email with OTP
     await sendOTPEmail(email, otp);
     
    const tempToken = encrypt(isUserExists.email);
    return NextResponse.json({ success: true, tempToken });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return NextResponse.json(
      { error: "Failed to generate verification code" },
      { status: 500 }
    );
  }
}
