import { Router } from "express";
import {
  createUserRoleController,
  deleteUserRoleController,
  getAllUserRoleController,
} from "../../../modules/user-role/user-roles.controller.js";

const router = Router();

router.get("/", getAllUserRoleController);
router.post("/", createUserRoleController);
router.delete("/", deleteUserRoleController);

export default router;
