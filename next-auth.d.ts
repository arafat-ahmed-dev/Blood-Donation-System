// Type declarations
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      isAdmin: boolean;
      bloodType: string;
      city: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    bloodType: string;
    city: string;
  }

  interface JWT {
    id: string;
    name: string;
    isAdmin: boolean;
    bloodType: string;
    city: string;
  }
}
