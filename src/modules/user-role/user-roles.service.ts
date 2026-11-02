import { ConflictException } from "../../exceptions/conflict.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import {
  userRoleFormatted,
  userRolesFormatted,
} from "../../mappers/user-role.mapper.js";
import { roleRepository } from "../roles/roles.repository.js";
import { userRepository } from "../users/users.repository.js";
import { userRolesRepository } from "./user-roles.repository.js";
import { UserRoleIdentifier, IUserRole } from "./user-roles.types.js";
import { AssignUserRole } from "./user-roles.validation.js";

export const userRolesService = {
  async getAll(filter?: UserRoleIdentifier): Promise<IUserRole[]> {
    const userRoles = await userRolesRepository.findAll(filter);

    return userRolesFormatted(userRoles);
  },
  async create(data: AssignUserRole): Promise<IUserRole> {
    const user = await userRepository.findOneByUuid(data.user_uuid);

    if (!user) throw new NotFoundException("User not found");

    const role = await roleRepository.findOneByUuid(data.role_uuid);

    if (!role) throw new NotFoundException("Role not found");

    const existing = await userRolesRepository.findOneByUserUuidAndRoleUuid({
      user_uuid: user.uuid,
      role_uuid: role.uuid,
    });

    if (existing)
      throw new ConflictException("Sorry, there's an existing user role assigned");

    return userRoleFormatted(await userRolesRepository.save({ user, role }));
  },
  async delete(payload: UserRoleIdentifier): Promise<{ message: string }> {
    const userRole =
      await userRolesRepository.findOneByUserUuidAndRoleUuid(payload);

    if (!userRole) throw new NotFoundException("User role not found");

    await userRolesRepository.remove(userRole.user, userRole.role);

    return { message: "User role deleted successfully" };
  },
};
