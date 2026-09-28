import { Request, Response } from "express";
import { roleService } from "./role.service.js";
import { StatusCode } from "../../common/constants/status-code.enum.js";

export const getAllRoleController = async (_req: Request, res: Response) => {
  const roles = await roleService.getAll();

  return res.status(StatusCode.OK).json({ data: roles });
};

export const getByUuidRoleController = async (req: Request, res: Response) => {
  const { uuid } = req.params as { uuid: string };

  const role = await roleService.getByUuid(uuid);

  return res.status(StatusCode.OK).json({ data: role });
};

export const createRoleController = async (req: Request, res: Response) => {
  const role = await roleService.create(req.body);

  return res.status(StatusCode.CREATED).json({ data: role });
};

export const updateRoleController = async (req: Request, res: Response) => {
  const { uuid } = req.params as { uuid: string };

  const role = await roleService.update(uuid, req.body);

  return res.status(StatusCode.OK).json({ data: role });
};

export const deleteRoleController = async (req: Request, res: Response) => {
  const { uuid } = req.params as { uuid: string };

  const role = await roleService.delete(uuid);

  return res.status(StatusCode.OK).json({ data: role });
};
