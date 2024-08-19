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
exports.removeFriend = exports.addFriend = exports.viewFriends = exports.getCurrentUser = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const ApiResponse_1 = __importDefault(require("../utilities/ApiResponse"));
const asyncHandler_1 = require("../utilities/asyncHandler");
const mongoose_1 = __importDefault(require("mongoose"));
const generateToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (user) {
        return user.generateAccessToken();
    }
    return null;
});
const registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, gender } = req.body;
    if ([username, email, password].some(field => typeof field !== "string" || field.trim() === "")) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "All fields are compulsory!"));
    }
    const existedUser = yield user_model_1.User.findOne({ $or: [{ username: username.toLowerCase() }, { email }] });
    if (existedUser) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "A user with the provided email or username already exists"));
    }
    const user = yield user_model_1.User.create({
        username: username.toLowerCase(),
        email,
        password,
        gender
    });
    const createdUser = yield user_model_1.User.findById(user._id).select("-password");
    if (!createdUser) {
        return res.status(500).json(new ApiResponse_1.default(500, [], "There was a problem creating the user."));
    }
    return res.status(201).json(new ApiResponse_1.default(201, { createdUser, config: password }, "User has been created successfully."));
}));
exports.registerUser = registerUser;
// Login user
const loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "Please enter a valid email"));
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "Invalid email!"));
    }
    const match = yield user.isPasswordCorrect(password);
    if (!match) {
        return res.status(401).json(new ApiResponse_1.default(401, [], "Incorrect password!"));
    }
    const accessToken = yield generateToken(user._id);
    const loggedInUser = yield user_model_1.User.findById(user._id).select("-password");
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };
    return res.status(200)
        .cookie("accessToken", accessToken !== null && accessToken !== void 0 ? accessToken : '', options)
        .json(new ApiResponse_1.default(200, {
        user: loggedInUser,
        accessToken
    }, "User logged in successfully"));
}));
exports.loginUser = loginUser;
const logoutUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "No user found to log out."));
    }
    try {
        yield user_model_1.User.findByIdAndUpdate(req.user._id, {
            $unset: {
                refreshToken: 1
            }
        }, { new: true });
    }
    catch (error) {
        return res.status(500).json(new ApiResponse_1.default(500, [], "An error occurred while logging out."));
    }
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };
    return res.status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse_1.default(200, {}, "User has been logged out"));
}));
exports.logoutUser = logoutUser;
const addFriend = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { friendId } = req.params;
    const friendObjectId = new mongoose_1.default.Types.ObjectId(friendId);
    if (!friendId) {
        return res.status(404).json(new ApiResponse_1.default(404, [], "Friend ID not found!"));
    }
    const user = yield user_model_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("-password");
    if ((_b = user === null || user === void 0 ? void 0 : user.friends) === null || _b === void 0 ? void 0 : _b.includes(friendObjectId)) {
        return res.status(400).json(new ApiResponse_1.default(400, {}, "User is already friended with the person."));
    }
    const friend = yield user_model_1.User.findByIdAndUpdate((_c = req.user) === null || _c === void 0 ? void 0 : _c._id, {
        $addToSet: {
            friends: friendObjectId,
        }
    });
    return res.status(200).json(new ApiResponse_1.default(200, { friend }, "Friend has been succesfully added"));
}));
exports.addFriend = addFriend;
const removeFriend = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { friendId } = req.params;
    const friendObjectId = new mongoose_1.default.Types.ObjectId(friendId);
    if (!friendId) {
        return res.status(404).json(new ApiResponse_1.default(404, [], "Friend ID not found!"));
    }
    const user = yield user_model_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("-password");
    if (!((_b = user === null || user === void 0 ? void 0 : user.friends) === null || _b === void 0 ? void 0 : _b.includes(friendObjectId))) {
        return res.status(400).json(new ApiResponse_1.default(400, {}, "You are not friend with that person"));
    }
    const friend = yield user_model_1.User.findByIdAndUpdate((_c = req.user) === null || _c === void 0 ? void 0 : _c._id, {
        $pull: {
            friends: friendObjectId,
        }
    });
    return res.status(200).json(new ApiResponse_1.default(200, { friend }, "Friend has been succesfully removed"));
}));
exports.removeFriend = removeFriend;
const viewFriends = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userFriends = yield user_model_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("friends username").populate({
        path: 'friends',
        select: 'username email'
    });
    return res.status(200).json(new ApiResponse_1.default(200, { userFriends }, "Friend data has been succesfully fetched"));
}));
exports.viewFriends = viewFriends;
// Get Current User
const getCurrentUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(404).json(new ApiResponse_1.default(404, [], "User not found."));
    }
    const user = yield user_model_1.User.findById(req.user._id).select("-password");
    return res.status(200).json(new ApiResponse_1.default(200, { user }, "User data has been fetched"));
}));
exports.getCurrentUser = getCurrentUser;
