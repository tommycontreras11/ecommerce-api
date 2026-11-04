import { Router } from "express";
import {
  createRolePermissionController,
  deleteRolePermissionController,
  getAllRolePermissionController,
} from "../../../modules/role-permissions/role-permissions.controller.js";
import { schemaValidator } from "../../../middlewares/schema-validator.middleware.js";
import { createRolePermissionSchema } from "../../../modules/role-permissions/role-permissions.validation.js";

const router = Router();

router.get("/", getAllRolePermissionController);
router.post(
  "/",
  schemaValidator(createRolePermissionSchema),
  createRolePermissionController,
);
router.delete("/", deleteRolePermissionController);

export default router;
