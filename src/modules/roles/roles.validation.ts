import z from "zod";

export const createRoleSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .max(100, { error: "Max length is 100" }),
    description: z.string().trim().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const updateRoleSchema = z
  .object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    is_active: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type CreateRole = z.infer<typeof createRoleSchema>;
export type UpdateRole = z.infer<typeof updateRoleSchema>;
