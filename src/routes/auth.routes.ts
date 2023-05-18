import express from "express"
import validateResource from "../middleware/validateResorce"
import { createSessionSchema } from "../schema/auth.schema"
import { createSessionHandler, refreshAccessTokenHandler } from "../controller/auth.controller"
import requireUser from "../middleware/requireUser"

const router = express.Router()

router.post("/api/sessions",validateResource(createSessionSchema),createSessionHandler)
router.post("/api/sessions/refresh",refreshAccessTokenHandler)


export default router