import { Router } from "express";
import { signInController } from "../../../modules/auth/auth.controller.js";

const router = Router()

router.post("/sign-in", signInController)

export default router