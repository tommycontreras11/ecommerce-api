import z from "zod";

export const signInSchema = z.object({
  email: z.email({ error: "Email is required" }).trim(),
  password: z.string({ error: "Password is required" }).trim(),
});

export type SignIn = z.infer<typeof signInSchema>;
