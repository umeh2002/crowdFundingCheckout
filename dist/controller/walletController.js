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
Object.defineProperty(exports, "__esModule", { value: true });
exports.payWithWallet = void 0;
const mainError_1 = require("../Error/mainError");
const edge_1 = require("@prisma/client/edge");
const prisma = new edge_1.PrismaClient();
const payWithWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const {id} = req.user
        // const {abegID} = req.params
        const { email, note, name, amount } = req.body;
        const payment = yield prisma.crowdCheckOut.create({
            data: {
                email, note, name, amount, abegID: "", userID: ""
            }
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "Payed Successfully",
            data: payment
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error",
            data: error.message
        });
    }
});
exports.payWithWallet = payWithWallet;
