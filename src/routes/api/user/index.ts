import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getByUuidUserController,
  updateUserController,
} from "../../../modules/users/users.controller.js";
import { schemaValidator } from "../../../middlewares/schema-validator.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../../../modules/users/users.validation.js";

const router = Router();

router.get("/", getAllUserController);
router.get("/:uuid", getByUuidUserController);
router.post("/", schemaValidator(createUserSchema), createUserController);
router.patch("/:uuid", schemaValidator(updateUserSchema), updateUserController);
router.delete("/:uuid", deleteUserController);

export default router;
