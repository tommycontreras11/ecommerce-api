import { StatusCode } from "../common/constants/status-code.enum.js";
import { HTTPException } from "./http-exception.js";

export class ConflictException extends HTTPException {
  constructor(message = "Conflict") {
    super(message, StatusCode.CONFLICT);
  }
}
