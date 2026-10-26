import { Request, Response } from "express";
import { userService } from "./users.service.js";
import { StatusCode } from "../../common/constants/status-code.enum.js";

export const getAllUserController = async (_req: Request, res: Response) => {
  const users = await userService.getAll();

  return res.status(StatusCode.OK).json({ data: users });
};

export const getByUuidUserController = async (req: Request, res: Response) => {
  const { uuid } = req.params as { uuid: string };

  const user = await userService.getByUuid(uuid);

  return res.status(StatusCode.OK).json({ data: user });
};

export const createUserController = async (req: Request, res: Response) => {
  const user = await userService.create(req.body);

  return res.status(StatusCode.OK).json({ data: user });
};

export const updateUserController = async (req: Request, res: Response) => {
  const { uuid } = req.params as { uuid: string };

  const user = await userService.update(uuid, req.body);

  return res.status(StatusCode.OK).json({ data: user });
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { uuid } = req.params as { uuid: string };

  const user = await userService.delete(uuid);

  return res.status(StatusCode.OK).json({ data: user });
};
