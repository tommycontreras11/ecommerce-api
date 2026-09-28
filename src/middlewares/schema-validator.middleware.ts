import { NextFunction, Request, Response } from "express";
import z from "zod";
import { StatusCode } from "../common/constants/status-code.enum.js";

export const schemaValidator =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    const errors = result.error?.flatten();

    if (!result.success)
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "Validation failed",
        errors: {
          formErrors: errors?.formErrors,
          fields: errors?.fieldErrors,
        },
      });

    req.body = result.data;
    next();
  };
