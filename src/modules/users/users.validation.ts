import z from "zod";

export const createUserSchema = z.object({
  first_name: z
    .string({ error: "First name is required" })
    .trim()
    .max(100, { error: "Max length is 100" }),
  last_name: z
    .string({ error: "Last name is required" })
    .trim()
    .max(100, { error: "Max length is 100" }),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .max(255, { error: "Max length is 255" }),
  password: z
    .string({ error: "Password is required" })
    .trim()
    .max(255, { error: "Max length is 255" }),
});

export const updateUserSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .max(100, { error: "Max length is 100" })
      .optional(),
    last_name: z
      .string()
      .trim()
      .max(100, { error: "Max length is 100" })
      .optional(),
    email: z
      .string()
      .trim()
      .max(255, { error: "Max length is 255" })
      .optional(),
    password: z
      .string()
      .trim()
      .max(255, { error: "Max length is 255" })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
