import AppDataSource from "../../config/database.js";
import { PermissionEntity } from "../../database/entities/permission.entity.js";
import { CreatePermission, UpdatePermission } from "./permissions.validation.js";

const entity = AppDataSource.getRepository(PermissionEntity);

export const permissionRepository = {
  findAll(): Promise<PermissionEntity[]> {
    return entity.find();
  },
  findOneByUuid(uuid: string): Promise<PermissionEntity | null> {
    return entity.findOneBy({ uuid });
  },
  findOneByName(name: string): Promise<PermissionEntity | null> {
    return entity.findOneBy({ name });
  },
  save(payload: CreatePermission): Promise<PermissionEntity> {
    const permission = entity.create({
      name: payload.name,
      ...(payload.description && { description: payload.description }),
      resource: payload.resource,
      action: payload.action,
    });

    return permission.save();
  },
  modify(
    permission: PermissionEntity,
    payload: UpdatePermission,
  ): Promise<PermissionEntity> {
    payload.name && (permission.name = payload.name);
    payload.description && (permission.description = payload.description);
    payload.resource && (permission.resource = payload.resource);
    payload.action && (permission.action = payload.action);

    return permission.save();
  },
  remove(uuid: string) {
    return entity.delete({ uuid });
  },
};
