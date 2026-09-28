import { StatusCode } from "../common/constants/status-code.enum.js";
import { HTTPException } from "./http-exception.js";

export class NotFoundException extends HTTPException {
  constructor(message = "Not found") {
    super(message, StatusCode.NOT_FOUND);
  }
}
