"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const checkoutRouter_1 = __importDefault(require("./router/checkoutRouter"));
const mainError_1 = require("./Error/mainError");
const HandleError_1 = require("./Error/HandleError");
const mainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Success",
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "Error",
                data: error.message
            });
        }
    });
    app.use("/api", checkoutRouter_1.default);
    app.all("*", (req, res, next) => {
        next(new mainError_1.mainError({
            name: "Router Error",
            message: "this router path is not correct",
            status: mainError_1.HTTP.BAD_REQUEST,
            success: false,
        }));
    });
    app.use(HandleError_1.HandleError);
};
exports.mainApp = mainApp;
