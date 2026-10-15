import { Request, Response } from "express";
import { permissionService } from "./permissions.service.js";
import { StatusCode } from "../../common/constants/status-code.enum.js";

export const getAllPermissionController = async (
  _req: Request,
  res: Response,
) => {
  const permissions = await permissionService.getAll();

  return res.status(StatusCode.OK).json({ data: permissions });
};

export const getByUuidPermissionController = async (
  req: Request,
  res: Response,
) => {
  const { uuid } = req.params as { uuid: string };

  const permission = await permissionService.getByUuid(uuid);

  return res.status(StatusCode.OK).json({ data: permission });
};

export const createPermissionController = async (
  req: Request,
  res: Response,
) => {
  const permission = await permissionService.create(req.body);

  return res.status(StatusCode.OK).json({ data: permission });
};

export const updatePermissionController = async (
  req: Request,
  res: Response,
) => {
  const { uuid } = req.params as { uuid: string };
  const permission = await permissionService.update(uuid, req.body);

  return res.status(StatusCode.OK).json({ data: permission });
};

export const deletePermissionController = async (
  req: Request,
  res: Response,
) => {
  const { uuid } = req.params as { uuid: string };
  const permission = await permissionService.delete(uuid);

  return res.status(StatusCode.OK).json({ data: permission });
};
