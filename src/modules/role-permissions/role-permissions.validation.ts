import z from "zod";

export const createRolePermissionSchema = z.object({
  role_uuid: z.uuid({ version: "v4", error: "Role uuid is required" }).trim(),
  permission_uuid: z
    .uuid({ version: "v4", error: "Permission uuid is required" })
    .trim(),
});

export const updateRolePermissionSchema = z.object({
  role_uuid: z.uuid({ version: "v4", error: "Role uuid is required" }).trim(),
  permission_uuid: z
    .uuid({ version: "v4", error: "Permission uuid is required" })
    .trim(),
});

export type CreateRolePermission = z.infer<typeof createRolePermissionSchema>;
export type UpdateRolePermission = z.infer<typeof updateRolePermissionSchema>;
