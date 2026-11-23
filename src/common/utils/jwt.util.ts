import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception.js";

interface IJwtPayload {
  sub: string;
  jti: string
}

export const generateAccessToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_TOKEN, {
    expiresIn: "15m",
    algorithm: "HS256",
  });
};

export const generateRefreshAccessToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_ACCESS_TOKEN, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

export const verifyAccessToken = (token: string): jwt.JwtPayload => {
  const payload = jwt.verify(token, env.JWT_ACCESS_TOKEN, { algorithms: ["HS256"] })

  if (!payload || typeof payload.sub !== "string") {
    throw new UnauthorizedException("Invalid access token");
  }

  return payload as jwt.JwtPayload;
};

export const verifyRefreshAccessToken = (
  token: string,
): string | jwt.JwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_ACCESS_TOKEN, {
    algorithms: ["HS256"],
  });
};
