import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/lib/prisma";


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
      },
      async authorize(credentials) {
        if (!credentials?.email)
          throw new Error("Email is required");
        console.log(credentials);
        

        // Check if the email is valid
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

          return donor;
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
