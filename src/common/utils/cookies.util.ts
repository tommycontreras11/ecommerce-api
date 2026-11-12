import type { CookieOptions, Response } from "express";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api/auth/refresh",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const setTokenCookie = (
  res: Response,
  token: string,
  env: string,
): void => {
  res.cookie(token, env, cookieOptions);
};

export const clearTokenCookie = (res: Response, env: string): void => {
  res.clearCookie(env, {
    httpOnly: true,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
  });
};
