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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiResponse_1 = __importDefault(require("../utilities/ApiResponse"));
const user_model_1 = require("../models/user.model");
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req === null || req === void 0 ? void 0 : req.cookies.accessToken;
        if (!token) {
            return res.status(400).json(new ApiResponse_1.default(400, [], "No authentication token found"));
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(400).json(new ApiResponse_1.default(400, [], "No authentication token or invalid token found!"));
        }
        const user = yield user_model_1.User.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id).select("-password");
        if (!user) {
            new ApiResponse_1.default(400, [], "Invalid token found!");
        }
        else {
            req.user = {
                _id: decodedToken._id
            };
        }
        next();
    }
    catch (error) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "There was a problem verifying token"));
    }
});
exports.default = verifyJWT;
