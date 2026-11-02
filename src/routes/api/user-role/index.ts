import { Router } from "express";
import {
  createUserRoleController,
  deleteUserRoleController,
  getAllUserRoleController,
} from "../../../modules/user-role/user-roles.controller.js";
import { schemaValidator } from "../../../middlewares/schema-validator.middleware.js";
import { assignUserRoleSchema } from "../../../modules/user-role/user-roles.validation.js";

const router = Router();

router.get("/", getAllUserRoleController);
router.post(
  "/",
  schemaValidator(assignUserRoleSchema),
  createUserRoleController,
);
router.delete("/", deleteUserRoleController);

export default router;
