import express from "express"
import { payWithWallet } from "../controller/walletController"

// import { checkOut } from "../utils/CheckVerify"
import { checkOutWithPayStack } from "../controller/checkoutController"

const router = express.Router()

router.route("/pay-with-wallet").post(payWithWallet)
router.route("/pay-with-PayStack").post(checkOutWithPayStack)

export default router