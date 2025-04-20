// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { verifyOTP } from '../verify-otp/route'
import prisma from '../../../../../prisma';

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'OTP Login',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        interface CredentialsType {
          phone: string;
          otp: string;
        }
        const { phone, otp } = credentials as CredentialsType
        const isUserExist = await prisma.user.findUnique({ where: { phoneNumber : phone } });
        if (!isUserExist) {
          throw new Error("User not found");
        }

        const valid = await verifyOTP(phone, otp)
        if (!valid) return null // OTP is invalid

        // Return user object with a default role
        return isUserExist
      },
    }),
  ],
  callbacks: {
     async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Make sure `role` is returned properly
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
