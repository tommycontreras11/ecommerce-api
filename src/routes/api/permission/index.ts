import { Router } from "express";
import {
  createPermissionController,
  deletePermissionController,
  getAllPermissionController,
  getByUuidPermissionController,
  updatePermissionController,
} from "../../../modules/permissions/permissions.controller.js";
import { schemaValidator } from "../../../middlewares/schema-validator.middleware.js";
import {
  createPermissionSchema,
  updatePermissionSchema,
} from "../../../modules/permissions/permissions.validation.js";

const router = Router();

router.get("/", getAllPermissionController);
router.get("/:uuid", getByUuidPermissionController);
router.post(
  "/",
  schemaValidator(createPermissionSchema),
  createPermissionController,
);
router.patch(
  "/:uuid",
  schemaValidator(updatePermissionSchema),
  updatePermissionController,
);
router.delete("/:uuid", deletePermissionController);

export default router;
