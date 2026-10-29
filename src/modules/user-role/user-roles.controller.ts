import { Request, Response } from "express";
import { userRolesService } from "./user-roles.service.js";
import { StatusCode } from "../../common/constants/status-code.enum.js";
import { BadRequestException } from "../../exceptions/bad-request.exception.js";

export const getAllUserRoleController = async (req: Request, res: Response) => {
  const { user_uuid, role_uuid } = req.query as {
    user_uuid: string;
    role_uuid: string;
  };

  const userRoles = await userRolesService.getAll({ user_uuid, role_uuid });

  return res.status(StatusCode.OK).json({ data: userRoles });
};

export const deleteUserRoleController = async (req: Request, res: Response) => {
  const { user_uuid, role_uuid } = req.query as {
    user_uuid: string;
    role_uuid: string;
  };

  if (!user_uuid)
    throw new BadRequestException("User uuid query param is required");

  if (!role_uuid)
    throw new BadRequestException("Role uuid query param is required");

  const userRole = await userRolesService.delete({ user_uuid, role_uuid });

  return res.status(StatusCode.OK).json({ data: userRole });
};
