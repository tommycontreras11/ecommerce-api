import { ConflictException } from "../../exceptions/conflict.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import {
  permissionFormatted,
  permissionsFormatted,
} from "../../mappers/permission.mapper.js";
import { permissionRepository } from "./permissions.repository.js";
import { IPermission } from "./permissions.types.js";
import {
  CreatePermission,
  UpdatePermission,
} from "./permissions.validation.js";

const validateExistingPermissionByName = async (
  uuid: string,
  name: string,
): Promise<void> => {
  const permission = await permissionRepository.findOneByName(name);

  if (permission && permission.uuid != uuid)
    throw new ConflictException("Please, select other name");
};

export const permissionService = {
  async getAll(): Promise<IPermission[]> {
    return permissionsFormatted(await permissionRepository.findAll());
  },
  async getByUuid(uuid: string): Promise<IPermission> {
    const permission = await permissionRepository.findOneByUuid(uuid);

    if (!permission) throw new NotFoundException("Permission not found");

    return permissionFormatted(permission);
  },
  async create(payload: CreatePermission): Promise<IPermission> {
    const permission = await permissionRepository.findOneByName(payload.name);

    if (permission) throw new ConflictException("Please, select other name");

    return permissionFormatted(await permissionRepository.save(payload));
  },
  async update(
    uuid: string,
    { name, ...payload }: UpdatePermission,
  ): Promise<IPermission> {
    const permission = await permissionRepository.findOneByUuid(uuid);

    if (!permission) throw new NotFoundException("Permission not found");

    if (name) await validateExistingPermissionByName(uuid, name);

    return permissionFormatted(
      await permissionRepository.modify(permission, { name, ...payload }),
    );
  },
  async delete(uuid: string): Promise<{
    message: string;
  }> {
    const permission = await permissionRepository.findOneByUuid(uuid);

    if (!permission) throw new NotFoundException("Permission not found");

    await permissionRepository.remove(uuid);

    return { message: "Permission deleted successfully" };
  },
};
