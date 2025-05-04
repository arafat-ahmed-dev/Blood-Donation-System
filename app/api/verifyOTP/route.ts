import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

// Initialize Redis
const redis = new Redis(process.env.REDIS_URL!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // Retrieve OTP from Redis
    const storedOtp = await redis.get(email);

    if (!storedOtp) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid; proceed with registration or action
    await redis.del(email); // Remove OTP after successful verification

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Error verifying OTP" });
  }
}
