import type { Redis } from "@upstash/redis";

export class OtpService {
  private redis: Redis | null;
  private otpExpirySeconds = 300; // 5 minutes
  private mockOtpStore: Map<string, string> = new Map(); // For mock implementation
  private mockMode: boolean = false;

  constructor(redisClient: Redis | null = null) {
    this.redis = redisClient;
    this.mockMode = !redisClient;

    if (this.mockMode) {
      console.warn("OTP Service running in mock mode - not for production use");
    }
  }

  async generateAndStoreOtp(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    if (this.mockMode) {
      this.mockOtpStore.set(this.otpKey(email), otp);
      // Set timeout to delete mock OTP after expiry
      setTimeout(() => {
        this.mockOtpStore.delete(this.otpKey(email));
      }, this.otpExpirySeconds * 1000);
    } else if (this.redis) {
      await this.redis.setex(this.otpKey(email), this.otpExpirySeconds, otp);
    } else {
      throw new Error("Redis client not available and not in mock mode");
    }

    return otp;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    let storedOtp: string | null = null;

    if (this.mockMode) {
      storedOtp = this.mockOtpStore.get(this.otpKey(email)) || null;
    } else if (this.redis) {
      storedOtp = await this.redis.get(this.otpKey(email));
    } else {
      throw new Error("Redis client not available and not in mock mode");
    }

    if (storedOtp && storedOtp === otp) {
      if (this.mockMode) {
        this.mockOtpStore.delete(this.otpKey(email));
      } else if (this.redis) {
        await this.redis.del(this.otpKey(email)); // Invalidate OTP after successful verification
      }
      return true;
    }

    return false;
  }

  private otpKey(email: string): string {
    return `otp:${email}`;
  }
}
