"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
(0, mainApp_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
    console.log("");
    console.log("server listening on port", port);
});
process.on("unhandledRejection", (reason) => {
    console.log("server unhandledRejection");
    console.log(reason);
});
process.on("uncaughtException", (error) => {
    console.log("server uncaughtException");
    console.log(error);
    server.close(() => {
        process.exit(1);
    });
});
