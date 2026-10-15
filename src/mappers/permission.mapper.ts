import { PermissionEntity } from "../database/entities/permission.entity.js";

export const permissionFormatted = (data: PermissionEntity) => {
  return {
    uuid: data.uuid,
    name: data.name,
    description: data?.description ?? null,
    resource: data.resource,
    action: data.action,
  };
};

export const permissionsFormatted = (data: PermissionEntity[]) =>
  data.map(permissionFormatted);
