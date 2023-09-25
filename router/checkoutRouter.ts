import Router from "express"
import { payment } from "../controller/checkoutController"

const router = Router()

router.route("/paymemt").post(payment)


export default router