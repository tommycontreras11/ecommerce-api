import z from "zod"

export const assignUserRoleSchema = z.object({
    role_uuid: z.uuid({ version: "v4", error: "Role uuid is required" }).trim(),
    user_uuid: z.uuid({ version: "v4", error: "User uuid is required" }).trim()
})

export const userRoleIdentifierSchema = z.object({
    role_uuid: z.uuid({ version: "v4", error: "Role uuid is required" }).trim(),
    user_uuid: z.uuid({ version: "v4", error: "User uuid is required" }).trim()
})

export type AssignUserRole = z.infer<typeof assignUserRoleSchema>