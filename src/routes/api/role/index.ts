import { Router } from "express";
import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  getByUuidRoleController,
  updateRoleController,
} from "../../../modules/role/role.controller.js";
import { schemaValidator } from "../../../middlewares/schema-validator.middleware.js";
import {
  createRoleSchema,
  updateRoleSchema,
} from "../../../dtos/role/role.dto.js";

const router = Router();

router.get("/", getAllRoleController);
router.get("/:uuid", getByUuidRoleController);
router.post("/", schemaValidator(createRoleSchema), createRoleController);
router.patch("/:uuid", schemaValidator(updateRoleSchema), updateRoleController);
router.delete("/:uuid", deleteRoleController);

export default router;
