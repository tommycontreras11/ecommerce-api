import { Request, Response } from "express";
import { StatusCode } from "../../common/constants/status-code.enum.js";
import { authService } from "./auth.service.js";
import { setTokenCookie } from "../../common/utils/cookies.util.js";
import { env } from "../../config/env.js";

export const signInController = async (req: Request, res: Response) => {
  const ipAddress = req.ip;
  const userAgent = req.headers["user-agent"];

  const auth = await authService.signIn({
    ...req.body,
    ipAddress,
    userAgent,
  });

  // setTokenCookie(res, "access_token", env.JWT_ACCESS_TOKEN);
  setTokenCookie(res, "refresh_token", auth.refresh_token);

  return res.status(StatusCode.OK).json({ data: auth });
};

export const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken)
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ error: { message: "Refresh token is required" } });

  const auth = authService.refresh(refreshToken);

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
