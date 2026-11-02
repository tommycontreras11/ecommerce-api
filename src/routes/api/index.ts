import { Router } from "express";
import rolesRoutes from "./role/index.js";
import permissionsRoutes from "./permission/index.js";
import usersRoutes from "./user/index.js";
import userRolesRoutes from "./user-role/index.js";
import rolePermissionsRoutes from "./role-permission/index.js";
import authRoutes from "./auth/index.js";

const router = Router();

router.use("/roles", rolesRoutes);
router.use("/permissions", permissionsRoutes);
router.use("/users", usersRoutes);
router.use("/user-roles", userRolesRoutes);
router.use("/role-permissions", rolePermissionsRoutes);
router.use("/auth", authRoutes);

export default router;
