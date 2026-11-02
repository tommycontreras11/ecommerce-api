import { NotFoundException } from "../../exceptions/not-found.exception.js";
import {
  userRolesFormatted,
} from "../../mappers/user-role.mapper.js";
import { userRolesRepository } from "./user-roles.repository.js";
import { UserRoleIdentifier, IUserRole } from "./user-roles.types.js";

export const userRolesService = {
  async getAll(filter?: UserRoleIdentifier): Promise<IUserRole[]> {
    const userRoles = await userRolesRepository.findAll(filter);

    return userRolesFormatted(userRoles);
  },
  async delete(payload: UserRoleIdentifier): Promise<{ message: string }> {
    const userRole =
      await userRolesRepository.findByUserUuidAndRoleUuid(payload);

    if (!userRole) throw new NotFoundException("User role not found");

    await userRolesRepository.remove(userRole.user, userRole.role);

    return { message: "User role deleted successfully" };
  },
};
