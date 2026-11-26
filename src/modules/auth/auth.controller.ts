import { Request, Response } from "express";
import { StatusCode } from "../../common/constants/status-code.enum.js";
import {
  clearTokenCookie,
  setTokenCookie,
} from "../../common/utils/cookies.util.js";
import { authService } from "./auth.service.js";
import { redisClient } from "../../config/redis.js";
import { verifyAccessToken } from "../../common/utils/jwt.util.js";

export const signInController = async (req: Request, res: Response) => {
  const ipAddress = req.ip;
  const userAgent = req.headers["user-agent"];

  const auth = await authService.signIn({
    ...req.body,
    ipAddress,
    userAgent,
  });

  setTokenCookie(res, "access_token", auth.access_token);
  setTokenCookie(res, "refresh_token", auth.refresh_token);

  return res.status(StatusCode.OK).json({ data: auth });
};

export const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken)
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ error: { message: "Refresh token is required" } });

  clearTokenCookie(res, "refresh_token");
  const auth = await authService.refresh(refreshToken);

  setTokenCookie(res, "refresh_token", auth.refresh_token);

  return res.status(StatusCode.OK).json({ data: auth });
};

export const signOutController = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization;
  let token: string | undefined;

  if (authorization) {
    const [, value] = authorization?.split(" ");

    token = value;
  } else {
    token = req.cookies.access_token;
  }

  const payload = verifyAccessToken(token!);

  const jti = payload.jti as string;
  const cacheKey = `black-listed-token:${jti}`;
  await redisClient.set(cacheKey, JSON.stringify(payload));

  req.user = null;

  await authService.signOut(req.cookies.refresh_token)

  clearTokenCookie(res, "access_token");
  clearTokenCookie(res, "refresh_token");

  return res
    .status(StatusCode.OK)
    .json({ data: { message: "Sign out successfully" } });
};

export const meController = async (req: Request, res: Response) => {
  const auth = await authService.me(req.user?.uuid!);

  return res.status(StatusCode.OK).json({ data: auth });
};
