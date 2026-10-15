import { Router } from "express";
import rolesRoutes from "./role/index.js";
import permissionsRoutes from "./permission/index.js";

const router = Router();

router.use("/roles", rolesRoutes);
router.use("/permissions", permissionsRoutes);

export default router;
