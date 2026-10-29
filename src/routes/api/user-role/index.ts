import { Router } from "express";
import {
  deleteUserRoleController,
  getAllUserRoleController,
} from "../../../modules/user-role/user-roles.controller.js";

const router = Router();

router.get("/", getAllUserRoleController);
router.delete("/", deleteUserRoleController);

export default router;
