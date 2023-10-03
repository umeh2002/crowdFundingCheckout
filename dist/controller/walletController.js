"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payWithWallet = void 0;
const mainError_1 = require("../Error/mainError");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const connection_1 = require("../utils/connection");
const prisma = new client_1.PrismaClient();
const URL = "https://crowded-auth.onrender.com";
const payWithWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { abegID } = req.params;
        const { email, note, name, amount } = req.body;
        const options = {
            method: "GET",
            url: `${URL}/api/${id}/single-account`
        };
        const wallet = yield axios_1.default.request(options).then((res) => {
            return res.data.data;
        });
        console.log(wallet.profile.walletBalance);
        console.log("name", name);
        console.log("email", email);
        console.log(typeof amount);
        if (wallet.profile.walletBalance > amount) {
            const payment = yield prisma.crowdCheckOut.create({
                data: {
                    email, note, name, amount: parseInt(amount), abegID, userID: id
                }
            });
            (0, connection_1.publishConnection)("checkouted", payment);
            return res.status(mainError_1.HTTP.OK).json({
                message: "Payed Successfully",
                data: payment
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD_REQUEST).json({
                message: "insufficient funds",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error",
            data: error.message
        });
    }
});
exports.payWithWallet = payWithWallet;
