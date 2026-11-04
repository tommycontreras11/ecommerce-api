import { Router } from "express";
import {
  meController,
  signInController,
} from "../../../modules/auth/auth.controller.js";
import { validateAuthentication } from "../../../middlewares/validate-authentication.middleware.js";
import { schemaValidator } from "../../../middlewares/schema-validator.middleware.js";
import { signInSchema } from "../../../modules/auth/auth.validation.js";

const router = Router();

router.post("/sign-in", schemaValidator(signInSchema), signInController);
router.get("/me", validateAuthentication, meController);

export default router;
