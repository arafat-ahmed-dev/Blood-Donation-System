import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Redis from "ioredis";

import prisma from "@/lib/prisma";
import { OtpService } from "./otp";

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
const otpService = new OtpService(redis);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp)
          throw new Error("Email and OTP are required");
        console.log(credentials);
        
        // Verify the OTP
        const isValid = await otpService.verifyOtp(
          credentials.email,
          credentials.otp
        );
        if (!isValid)
          throw new Error("Invalid or expired OTP. Please request a new one.");
        try {
          const donor = await prisma.donor.findUnique({
            where: {
              email: credentials.email,
            },
          });
          console.log(donor);
          
          if (!donor) {
            return null;
          }

          return {
            id: donor.id,
            name: donor.name,
            email: donor.email,
            isAdmin: donor.isAdmin,
            city: donor.city,
            bloodType: donor.bloodType,
          };
        } catch (error) {
          console.error("Error authorizing user:", error);
          throw new Error(
            typeof error === "string" ? error : "Authentication error"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If this is a sign-in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.isAdmin = user.isAdmin;
        token.city = user.city;
        token.bloodType = user.bloodType;
      }
      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
          isAdmin: token.isAdmin as boolean,
          city: token.city as string,
          bloodType: token.bloodType as string,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
