import express from "express"
import validateResource from "../middleware/validateResorce"
import { createUserSchema, forgotPasswordSchema, verifyUserSchema, resetPasswordSchema } from '../schema/user.schema';
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from "../controller/user.controller"
import requireUser from "../middleware/requireUser";

const router = express.Router()

router.post("/api/users",validateResource(createUserSchema), createUserHandler)
//We validate the request received with our createUserSchema using validateResource and then process it with createUserHandler

router.post("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), verifyUserHandler)
router.post("/api/users/forgotpassword",validateResource(forgotPasswordSchema),forgotPasswordHandler)

router.post("/api/users/resetpassword/:id/:passwordResetCode", validateResource(resetPasswordSchema), resetPasswordHandler)
router.get("/api/users/me", requireUser,getCurrentUserHandler)

export default router