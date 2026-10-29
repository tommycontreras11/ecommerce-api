import { Router } from "express";
import rolesRoutes from "./role/index.js";
import permissionsRoutes from "./permission/index.js";
import usersRoutes from "./user/index.js";
import userRolesRoutes from "./user-role/index.js";

const router = Router();

router.use("/roles", rolesRoutes);
router.use("/permissions", permissionsRoutes);
router.use("/users", usersRoutes);
router.use("/user-roles", userRolesRoutes);

export default router;
