import { ConflictException } from "../../exceptions/conflict.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { roleFormatted, rolesFormatted } from "../../mappers/role.mapper.js";
import {
  ICreateRole,
  IRole,
  IUpdateRole,
} from "./interfaces/role.interface.js";
import { roleRepository } from "./role.repository.js";

const validateExistingRoleByName = async (
  name: string,
  uuid: string,
): Promise<void> => {
  const role = await roleRepository.findOneByName(name);

  if (role && role.uuid != uuid)
    throw new ConflictException("Please, select other name");
};

export const roleService = {
  async getAll(): Promise<IRole[]> {
    return rolesFormatted(await roleRepository.findAll());
  },
  async getByUuid(uuid: string): Promise<IRole> {
    const role = await roleRepository.findOneByUuid(uuid);

    if (!role) throw new NotFoundException("Role not found");

    return roleFormatted(role);
  },
  async create({ name, ...payload }: ICreateRole): Promise<IRole> {
    const role = await roleRepository.findOneByName(name);

    if (role) throw new ConflictException("Please, select other name");

    return roleFormatted(await roleRepository.save({ name, ...payload }));
  },
  async update(
    uuid: string,
    { name, ...payload }: IUpdateRole,
  ): Promise<IRole> {
    const role = await roleRepository.findOneByUuid(uuid);

    if (!role) throw new NotFoundException("Role not found");

    if (name) await validateExistingRoleByName(name, role.uuid);

    return roleFormatted(
      await roleRepository.modify(role, { name, ...payload }),
    );
  },
  async delete(uuid: string) {
    const role = await roleRepository.findOneByUuid(uuid);

    if (!role) throw new NotFoundException("Role not found");

    await roleRepository.remove(uuid);

    return { message: "Role deleted successfully" };
  },
};
