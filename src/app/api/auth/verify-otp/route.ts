import redis from '@/lib/redis'

export async function verifyOTP(phone: string, otp: string) {
  const validOtp = await redis.get(`otp:${phone}`)
  if (!validOtp || validOtp !== otp) return false

  await redis.del(`otp:${phone}`) // consume OTP
  return true
}