import { Request, Response } from "express";
import { rolePermissionsService } from "./role-permissions.service.js";
import { StatusCode } from "../../common/constants/status-code.enum.js";
import { BadRequestException } from "../../exceptions/bad-request.exception.js";

export const getAllRolePermissionController = async (
  req: Request,
  res: Response,
) => {
  const { role_uuid, permission_uuid } = req.query as {
    role_uuid: string;
    permission_uuid: string;
  };

  const rolePermissions = await rolePermissionsService.getAll({
    role_uuid,
    permission_uuid,
  });

  return res.status(StatusCode.OK).json({ data: rolePermissions });
};

export const createRolePermissionController = async (
  req: Request,
  res: Response,
) => {
  const rolePermission = await rolePermissionsService.create(req.body);

  return res.status(StatusCode.OK).json({ data: rolePermission });
};

export const deleteRolePermissionController = async (
  req: Request,
  res: Response,
) => {
  const { role_uuid, permission_uuid } = req.query as {
    role_uuid: string;
    permission_uuid: string;
  };

  if (!role_uuid) throw new BadRequestException("Role uuid is required");

  if (!permission_uuid)
    throw new BadRequestException("Permission uuid is required");

  const rolePermission = await rolePermissionsService.delete({
    role_uuid,
    permission_uuid,
  });

  return res.status(StatusCode.OK).json({ data: rolePermission });
};
