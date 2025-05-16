// app/api/auth/generateOTP/route.ts
import { NextResponse } from "next/server";
import Redis from "ioredis";
import { OtpService } from "@/lib/otp";
import prisma from "@/lib/prisma";
import { sendOTPEmail } from "@/lib/email";
import { encrypt } from "@/lib/data-encryption-utils";
import { authErrors } from "@/lib/api-error-handler";
import { z } from "zod";

// Initialize Redis and OTP service
let redis: Redis | null = null;
let otpService: OtpService;

try {
  redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
  console.log("Redis connection initialized");
  otpService = new OtpService(redis);
} catch (error) {
  console.warn("Failed to connect to Redis, using mock OTP service:", error);
  otpService = new OtpService(null); // Use mock mode
}

// Input validation schema
const emailSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    console.log("Generate OTP request:", { email: body.email });

    const validationResult = emailSchema.safeParse(body);

    if (!validationResult.success) {
      return authErrors.validationError(
        validationResult.error.errors[0]?.message || "Invalid email format"
      );
    }

    const { email } = validationResult.data;

    // Check if user exists
    const isUserExists = await prisma.donor.findUnique({
      where: { email },
    });

    if (!isUserExists) {
      return authErrors.userNotFound();
    }

    // Generate OTP using the service
    const otp = await otpService.generateAndStoreOtp(email);
    console.log("OTP generated:", {
      email,
      otp: process.env.NODE_ENV === "development" ? otp : "******",
    });

    // Send email with OTP
    try {
      await sendOTPEmail(email, otp);
      console.log("OTP email sent successfully");
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      return authErrors.serverError(
        "Failed to send verification email. Please try again."
      );
    }

    // Create temp token and return success response
    const tempToken = encrypt(isUserExists.email);

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully",
      tempToken,
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return authErrors.serverError("Failed to generate verification code");
  }
}
