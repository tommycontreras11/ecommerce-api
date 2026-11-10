import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { StatusCode } from "../../common/constants/status-code.enum.js";

export const signInController = async (req: Request, res: Response) => {
  const ipAddress = req.ip;
  const userAgent = req.headers["user-agent"];

  const auth = await authService.signIn({
    ...req.body,
    ipAddress,
    userAgent
  });

  return res.status(StatusCode.OK).json({ data: auth });
};

export const signOut = async (req: Request, res: Response) => {
  req.user = null;

  return res
    .status(StatusCode.OK)
    .json({ data: { message: "Sign out successfully" } });
};

export const meController = async (req: Request, res: Response) => {
  const auth = await authService.me(req.user?.uuid!);

  return res.status(StatusCode.OK).json({ data: auth });
};
