import redis from "./redis";

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeOtp(phone: string, otp: string) {
  await redis.set(`otp:${phone}`, otp, "EX", 300); // Expires in 5 minutes
}

export async function validateOtp(phone: string, otp: string): Promise<boolean> {
  const storedOtp = await redis.get(`otp:${phone}`);
  return storedOtp === otp;
}
