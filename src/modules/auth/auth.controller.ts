import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { StatusCode } from "../../common/constants/status-code.enum.js";

export const signInController = async (req: Request, res: Response) => {
  const token = await authService.signIn(req.body);

  return res.status(StatusCode.OK).json({ data: token });
};
