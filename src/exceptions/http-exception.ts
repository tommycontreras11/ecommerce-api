import { StatusCode } from "../common/constants/status-code.enum.js";

export class HTTPException extends Error {
  statusCode: StatusCode;

  constructor(message = "Something went wrong", statusCode: StatusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
  }
}
