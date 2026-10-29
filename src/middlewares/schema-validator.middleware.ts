import { NextFunction, Request, Response } from "express";
import z from "zod";
import { StatusCode } from "../common/constants/status-code.enum.js";

export const schemaValidator =
  (schema: z.ZodType, type: "body" | "query" | "params" = "body") => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[type]);

    const errors = result.error?.flatten();

    if (!result.success)
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "Validation failed",
        errors: {
          formErrors: errors?.formErrors,
          fields: errors?.fieldErrors,
        },
      });

    req[type] = result.data;
    next();
  };
