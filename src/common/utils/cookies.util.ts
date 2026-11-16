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
  tokenName: "access_token" | "refresh_token",
  value: string,
): void => {
  res.cookie(tokenName, value, cookieOptions);
};

export const clearTokenCookie = (res: Response, tokenName: string): void => {
  res.clearCookie(tokenName, {
    httpOnly: true,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
  });
};
