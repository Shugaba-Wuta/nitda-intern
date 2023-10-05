import { Router } from "express";
import guard_ from "express-jwt-permissions"
import { getBankName } from "../controllers/misc-controller";


const router = Router()
const guard = guard_()

router.post("/get-account-name", guard.check(["admin"]), getBankName)

export default router