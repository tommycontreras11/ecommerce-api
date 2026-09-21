import { NextFunction, Request, Response } from "express";
import { HTTPException } from "../exceptions/http-exception.js";
import { StatusCode } from "../common/constants/status-code.enum.js";

export const errorHandlerMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof HTTPException) {
    return res
      .status(error.statusCode)
      .json({ error: { message: error.message } });
  }

  return res
    .status(StatusCode.INTERNAL_SERVER_ERROR)
    .json({ error: { message: "Internal Server Error" } });
};
