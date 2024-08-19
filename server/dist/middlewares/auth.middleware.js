"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiResponse_1 = __importDefault(require("../utilities/ApiResponse"));
const verifyJWT = (req, res, next) => {
    try {
        const token = req === null || req === void 0 ? void 0 : req.cookies.accessToken;
        if (!token) {
            return res.status(400).json(new ApiResponse_1.default(400, [], "No authentication token found"));
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(400).json(new ApiResponse_1.default(400, [], "No authentication token or invalid token found!"));
        }
        req.user = {
            _id: decodedToken._id
        };
        next();
    }
    catch (error) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "There was a problem verifying token"));
    }
};
exports.default = verifyJWT;
