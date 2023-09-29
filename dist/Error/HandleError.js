"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = void 0;
const mainError_1 = require("./mainError");
const errorBuilder = (err, res) => {
    res.status(mainError_1.HTTP.BAD_REQUEST).json({
        name: err.name,
        message: err.message,
        status: err.status,
        success: err.success,
        error: err
    });
};
const HandleError = (err, req, res, next) => {
    errorBuilder(err, res);
};
exports.HandleError = HandleError;
