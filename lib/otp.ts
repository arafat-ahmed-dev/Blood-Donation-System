import type { Redis } from "ioredis";

export class OtpService {
  private redis: Redis;
  private otpExpirySeconds = 300; // 5 minutes

  constructor(redisClient: Redis) {
    this.redis = redisClient;
  }

  async generateAndStoreOtp(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    await this.redis.setex(this.otpKey(email), this.otpExpirySeconds, otp);

    return otp;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const storedOtp = await this.redis.get(this.otpKey(email));

    if (storedOtp && storedOtp === otp) {
      await this.redis.del(this.otpKey(email)); // Invalidate OTP after successful verification
      return true;
    }

    return false;
  }

  private otpKey(email: string): string {
    return `otp:${email}`;
  }
}
