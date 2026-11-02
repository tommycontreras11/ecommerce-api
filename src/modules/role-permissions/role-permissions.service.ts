import { ConflictException } from "../../exceptions/conflict.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import {
  rolePermissionFormatted,
  rolePermissionsFormatted,
} from "../../mappers/role-permission.mapper.js";
import { permissionRepository } from "../permissions/permissions.repository.js";
import { roleRepository } from "../roles/roles.repository.js";
import {
  IRolePermission,
  RolePermissionIdentifier,
} from "./role-permissions.types.js";
import { CreateRolePermission } from "./role-permissions.validation.js";
import { rolePermissionsRepository } from "./role-permissions.repository.js";

export const rolePermissionsService = {
  async getAll(filter?: RolePermissionIdentifier): Promise<IRolePermission[]> {
    return rolePermissionsFormatted(
      await rolePermissionsRepository.findAll(filter),
    );
  },
  async create(data: CreateRolePermission): Promise<IRolePermission> {
    const role = await roleRepository.findOneByUuid(data.role_uuid);

    if (!role) throw new NotFoundException("Role not found");

    const permission = await permissionRepository.findOneByUuid(
      data.permission_uuid,
    );

    if (!permission) throw new NotFoundException("Permission not found");

    const existing =
      await rolePermissionsRepository.findOneByRoleUuidAndPermissionUuid({
        role_uuid: role.uuid,
        permission_uuid: permission.uuid,
      });

    if (existing)
      throw new ConflictException(
        "Sorry, there's an existing role permission assigned",
      );

    return rolePermissionFormatted(
      await rolePermissionsRepository.save({ role, permission }),
    );
  },
  async delete(
    payload: RolePermissionIdentifier,
  ): Promise<{ message: string }> {
    const rolePermission =
      await rolePermissionsRepository.findOneByRoleUuidAndPermissionUuid(
        payload,
      );

    if (!rolePermission)
      throw new NotFoundException("Role permission not found");

    await rolePermissionsRepository.remove(rolePermission);

    return { message: "Role permission delete successfully" };
  },
};
