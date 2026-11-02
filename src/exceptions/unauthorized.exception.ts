import { StatusCode } from "../common/constants/status-code.enum.js";
import { HTTPException } from "./http-exception.js";

export class UnauthorizedException extends HTTPException {
  constructor(message = "Unauthorized") {
    super(message, StatusCode.UNAUTHORIZED);
  }
}
