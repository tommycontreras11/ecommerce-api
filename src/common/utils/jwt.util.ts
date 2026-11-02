import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

interface IJwtPayload {
  sub: string;
}

export const generateAccessToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_TOKEN, {
    expiresIn: "24h",
    algorithm: "HS256",
  });
};

export const verifyAccessToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, env.JWT_ACCESS_TOKEN, { algorithms: ["HS256"] });
};
