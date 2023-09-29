"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletController_1 = require("../controller/walletController");
// import { checkOut } from "../utils/CheckVerify"
const checkoutController_1 = require("../controller/checkoutController");
const router = express_1.default.Router();
router.route("/pay-with-wallet").post(walletController_1.payWithWallet);
router.route("/pay-with-PayStack").post(checkoutController_1.checkOutWithPayStack);
exports.default = router;
