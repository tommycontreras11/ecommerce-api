import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../common/constants/status-code.enum.js";
import { verifyAccessToken } from "../common/utils/jwt.util.js";
import { userRepository } from "../modules/users/users.repository.js";
import { redisClient } from "../config/redis.js";

export async function validateAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;
    let token: string | undefined;

    if (authorization) {
      const [scheme, value] = authorization?.split(" ");

      if (scheme !== "Bearer" || !value)
        return res
          .status(StatusCode.UNAUTHORIZED)
          .json({ error: { message: "Invalid authorization header" } });

      token = value;
    } else {

      if(!req.cookies) return res
          .status(StatusCode.UNAUTHORIZED)
          .json({ error: { message: "Invalid cookie token" } });

      token = req.cookies.access_token;
    }

    if (!token)
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: { message: "Authentication token is missing" } });

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (error) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: { message: "Invalid or expired token" } });
    }

    const cacheKey = `black-listed-token:${payload.jti}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData)
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: { message: "Invalid or expired token" } });

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
