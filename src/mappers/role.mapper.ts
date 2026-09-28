import { RoleEntity } from "../database/entities/roles.entity.js";

export const roleFormatted = (role: RoleEntity) => {
    return {
        uuid: role.uuid,
        name: role.name,
        description: role?.description ?? null,
        is_active: role.is_active
    }
}

export const rolesFormatted = (roles: RoleEntity[]) => roles.map(roleFormatted)