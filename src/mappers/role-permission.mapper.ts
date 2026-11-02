import { RolePermissionEntity } from "../database/entities/role-permission.entity.js";
import { IRolePermission } from "../modules/role-permissions/role-permissions.types.js";

export const rolePermissionFormatted = (
  data: RolePermissionEntity,
): IRolePermission => {
  return {
    role: {
      uuid: data.role.uuid,
      name: data.role.name,
      description: data.role.description ?? null,
    },
    permission: {
      uuid: data.permission.uuid,
      name: data.permission.name,
      description: data.permission.description ?? null,
      resource: data.permission.resource,
      action: data.permission.action,
    },
  };
};

export const rolePermissionsFormatted = (data: RolePermissionEntity[]) =>
  data.map(rolePermissionFormatted);
