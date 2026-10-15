import z from "zod";

export const createPermissionSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .max(255, { error: "Max length is 255" }),
    description: z.string().trim().optional(),
    resource: z
      .string({ error: "Resource is required" })
      .trim()
      .max(100, { error: "Max length is 100" }),
    action: z
      .string({ error: "Action is required" })
      .trim()
      .max(100, { error: "Max length is 100" }),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const updatePermissionSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .max(255, { error: "Max length is 255" })
      .optional(),
    description: z.string().trim().optional(),
    resource: z
      .string({ error: "Resource is required" })
      .trim()
      .max(100, { error: "Max length is 100" })
      .optional(),
    action: z
      .string({ error: "Action is required" })
      .trim()
      .max(100, { error: "Max length is 100" })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type CreatePermission = z.infer<typeof createPermissionSchema>;
export type UpdatePermission = z.infer<typeof updatePermissionSchema>;
