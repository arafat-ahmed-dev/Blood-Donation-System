import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

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
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
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

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bloodType: user.bloodType,
        isAdmin: user.isAdmin,
        donorLevel: user.donorLevel,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
