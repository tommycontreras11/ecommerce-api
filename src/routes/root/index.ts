import { Request, Response, Router } from "express";
import { StatusCode } from "../../common/constants/status-code.enum.js";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  return res.status(StatusCode.OK).json({ healthy: true });
});

export default router;
