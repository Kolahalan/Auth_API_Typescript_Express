import express from "express"
import user from "./user.routes"
import auth from "./auth.routes"
import employeeRouter from "./employee.routes"
import requireUser from "../middleware/requireUser"

const router = express.Router()

router.get("/healthcheck",(_,res)=>{
    res.sendStatus(200)
})

router.use(user)
router.use(auth)
//router.use(requireUser) // - To ensure that all the request that come beyond this point should have a user logged in
router.use(employeeRouter)



export default router