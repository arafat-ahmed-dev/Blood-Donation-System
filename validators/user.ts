import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  bloodGroup: z.string(),
  location: z.string(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
