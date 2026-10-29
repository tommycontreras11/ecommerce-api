import { StatusCode } from "../common/constants/status-code.enum.js";
import { HTTPException } from "./http-exception.js";

export class BadRequestException extends HTTPException {
  constructor(message = "Bad Request") {
    super(message, StatusCode.BAD_REQUEST);
  }
}
