import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../common/constants/status-code.enum.js";
import { verifyAccessToken } from "../common/utils/jwt.util.js";
import { userRepository } from "../modules/users/users.repository.js";

export async function validateAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers["authorization"];

  if (!authorization)
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ data: { message: "Authorization header token is missing" } });

  const jwt = authorization?.split("Bearer ")[1];
  if (!jwt)
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ data: { message: "You must be authenticated" } });

  let payload;
  try {
    payload = verifyAccessToken(jwt!);
  } catch (error) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ data: { message: "Token not valid" } });
  }

  const user = await userRepository.findOneByUuid(payload.sub as string);

  req.user = user!;

  next();
}
