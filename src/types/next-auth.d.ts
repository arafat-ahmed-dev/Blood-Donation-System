export interface User {
  id: string;
  name?: string;
  firstName?: string;
  initials?: string;
  bloodType?: string;
  avatarUrl?: string;
  email?: string;
  phoneNumber?: string;
  role?: "user" | "donor" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
