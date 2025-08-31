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
      console.warn(
        "⚠️ OTP Service running in mock mode - not for production use"
      );
    }
  }

  async generateAndStoreOtp(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    if (this.mockMode) {
      this.mockOtpStore.set(this.otpKey(email), otp);
      // Auto-expire mock OTP
      setTimeout(() => {
        this.mockOtpStore.delete(this.otpKey(email));
      }, this.otpExpirySeconds * 1000);
    } else if (this.redis) {
      // Ensure we store as string
      await this.redis.set(this.otpKey(email), otp, {
        ex: this.otpExpirySeconds,
      });
    } else {
      throw new Error("Redis client not available and not in mock mode");
    }

    return otp;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    let storedOtp: string | null = null;
    console.log("Provided OTP ", otp);
    console.log("Provided EMAIL ", email);
    
    if (this.mockMode) {
      storedOtp = this.mockOtpStore.get(this.otpKey(email)) || null;
    } else if (this.redis) {
      const redisOtp = await this.redis.get(this.otpKey(email));
      storedOtp = redisOtp ? String(redisOtp) : null; // Convert to string
    } else {
      throw new Error("Redis client not available and not in mock mode");
    }
    console.log("Stored OTP", storedOtp);
    
    if (storedOtp) {
      const trimmedStoredOtp = storedOtp.trim();
      const trimmedProvidedOtp = otp.trim();

      if (trimmedStoredOtp === trimmedProvidedOtp) {
        if (this.mockMode) {
          this.mockOtpStore.delete(this.otpKey(email));
        } else if (this.redis) {
          await this.redis.del(this.otpKey(email)); // Invalidate OTP after successful verification
        }
        return true;
      }
    }

    return false;
  }
  private otpKey(email: string): string {
    return `otp:${email}`;
  }
}
