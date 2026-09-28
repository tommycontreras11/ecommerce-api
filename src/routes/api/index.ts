import { Router } from "express";
import rolesRoutes from "./role/index.js"

const router = Router()

router.use("/roles", rolesRoutes)

export default router