import { DeleteResult, EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { RolePermissionEntity } from "../../database/entities/role-permission.entity.js";
import { RolePermissionIdentifier } from "./role-permissions.types.js";

const entity = AppDataSource.getRepository(RolePermissionEntity);

export const rolePermissionsRepository = {
  findAll(filter?: RolePermissionIdentifier): Promise<RolePermissionEntity[]> {
    let query = { role: {}, permission: {} };

    if (filter?.role_uuid) {
      query.role = { uuid: filter.role_uuid };
    }

    if (filter?.permission_uuid) {
      query.permission = { uuid: filter.permission_uuid };
    }

    return entity.find({
      relations: { role: true, permission: true },
      ...(filter && { where: { ...query } }),
    });
  },
  findOneByRoleUuidAndPermissionUuid(
    payload: RolePermissionIdentifier,
  ): Promise<RolePermissionEntity | null> {
    return entity.findOne({
      where: {
        role: { uuid: payload.role_uuid },
        permission: { uuid: payload.permission_uuid },
      },
      relations: { role: true, permission: true },
    });
  },
  save(
    payload: Partial<RolePermissionEntity>,
    manager: EntityManager = AppDataSource.manager,
  ): Promise<RolePermissionEntity> {
    return manager.save(RolePermissionEntity, payload);
  },
  remove(
    rolePermission: RolePermissionEntity
  ): Promise<DeleteResult> {
    return entity.delete({
      role_id: rolePermission.role.id,
      permission_id: rolePermission.permission.id,
    });
  },
};
