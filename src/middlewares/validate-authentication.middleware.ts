import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../common/constants/status-code.enum.js";
import { verifyAccessToken } from "../common/utils/jwt.util.js";
import { userRepository } from "../modules/users/users.repository.js";

export async function validateAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization)
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: { message: "Authorization header is missing" } });

    const [scheme, token] = authorization?.split(" ");

    if (scheme != "Bearer" || !token)
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: { message: "Invalid authorization header" } });

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (error) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: { message: "Invalid or expired token" } });
    }

    if (typeof payload.sub !== "string")
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: { message: "Invalid token payload" } });

    const user = await userRepository.findOneByUuid(payload.sub as string);

    if (!user)
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: { message: "User not found" } });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
