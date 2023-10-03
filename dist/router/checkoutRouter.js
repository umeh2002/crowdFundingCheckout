"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletController_1 = require("../controller/walletController");
const CheckVerify_1 = require("../utils/CheckVerify");
const checkoutController_1 = require("../controller/checkoutController");
const router = express_1.default.Router();
router.route("/:abegID/pay-with-wallet").post(CheckVerify_1.checkOut, walletController_1.payWithWallet);
router.route("/:abegID/pay-with-PayStack").post(checkoutController_1.checkOutWithPayStack);
exports.default = router;
