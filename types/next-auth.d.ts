import "next-auth";
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
    phone?: string | null;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: string;
      phone: string | null;
    };
  }
}