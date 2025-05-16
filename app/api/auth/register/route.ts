import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { OtpService } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/email";
import { authErrors } from "@/lib/api-error-handler";
import Redis from "ioredis";
import { encrypt } from "@/lib/data-encryption-utils";

// Initialize Redis and OTP service
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
const otpService = new OtpService(redis);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      bloodType,
      phone,
      address,
      city,
      upazila,
      zip,
      dateOfBirth,
      gender,
      image,
    } = body;

    if (
      !name ||
      !email ||
      !bloodType ||
      !address ||
      !city ||
      !upazila ||
      !dateOfBirth ||
      !gender
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.donor.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return authErrors.emailInUse();
    }

    // Calculate age from dateOfBirth
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();

    // Create user
    const user = await prisma.donor.create({
      data: {
        name,
        email,
        bloodType,
        phone,
        address,
        city,
        upazila,
        zip,
        dateOfBirth: new Date(dateOfBirth),
        age,
        gender,
        registrationDate: new Date(),
        donorLevel: "Bronze",
        totalDonations: 0,
        isAdmin: false,
        image,
      },
    });

    if (!user) {
      return authErrors.serverError(
        "Failed to create user. Please try again."
      );
    }
    // Generate OTP using the service
    const otp = await otpService.generateAndStoreOtp(email);

    // Send email with OTP
    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      return authErrors.serverError(
        "Failed to send verification email. Please try again."
      );
    }

    // Create temp token and return success response
    const tempToken = encrypt(email);

    return NextResponse.json({
      tempToken,
      message: "Registration successful. Verification code sent to email.",
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
