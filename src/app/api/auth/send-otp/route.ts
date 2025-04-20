// app/api/auth/send-otp/route.ts
import { NextResponse } from 'next/server'
import redis from '@/lib/redis'
import { twilioClient } from '@/lib/twilio'
import prisma from '../../../../../prisma';

export async function POST(req: Request) {
  const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { error: "phone number is required" },
        { status: 400 }
      );
    }
    console.log(phone);
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { phoneNumber: phone },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found with this phone number" },
        { status: 404 }
      );
    }
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  try {
    await redis.set(`otp:${phone}`, otp); // Set OTP
    await redis.expire(`otp:${phone}`, 300); // Set expiration to 5 mins
  } catch (error) {
    console.error('Redis connection error:', error);
    return NextResponse.json(
      { error: "Failed to save OTP. Please try again later." },
      { status: 500 }
    );
  }

  await twilioClient.messages.create({
    body: `Your Rokto verification code is: ${otp}. Valid for 10 minutes.`,
    from: process.env.TWILIO_phone_NUMBER,
    to: phone,
  })

  return NextResponse.json({ success: true })
}
