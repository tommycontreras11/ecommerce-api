import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception.js";

interface IJwtPayload {
  sub: string;
  jti: string;
  sid: string
}

export const generateAccessToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_TOKEN, {
    expiresIn: "15m",
    algorithm: "HS256",
  });
};

export const generateRefreshToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_ACCESS_TOKEN, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

export const verifyAccessToken = (token: string): jwt.JwtPayload => {
  const payload = jwt.verify(token, env.JWT_ACCESS_TOKEN, {
    algorithms: ["HS256"],
  });

  if (
    typeof payload === "string" ||
    typeof payload.sub !== "string" ||
    typeof payload.jti !== "string"
  ) {
    throw new UnauthorizedException("Invalid access token");
  }

  return payload as jwt.JwtPayload;
};

export const verifyRefreshToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_ACCESS_TOKEN, {
    algorithms: ["HS256"],
  });
};
