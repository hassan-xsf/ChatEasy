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
exports.viewGroup = exports.viewGroups = exports.createGroup = void 0;
const asyncHandler_1 = require("../utilities/asyncHandler");
const group_model_1 = require("../models/group.model");
const ApiResponse_1 = __importDefault(require("../utilities/ApiResponse"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.createGroup = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, members } = req.body;
    if (!name || !Array.isArray(members)) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "Invalid group name or member IDs"));
    }
    const existingGroup = yield group_model_1.Group.findOne({
        members: { $all: members }
    });
    if (existingGroup) {
        return res.status(200).json(new ApiResponse_1.default(200, existingGroup, "Group already existed!"));
    }
    const owner = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!owner) {
        return res.status(403).json(new ApiResponse_1.default(403, [], "You must be logged in to create a group"));
    }
    const group = yield group_model_1.Group.create({
        name,
        owner,
        members
    });
    return res.status(201).json(new ApiResponse_1.default(201, group, "Group has been created successfully"));
}));
exports.viewGroups = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const group = yield group_model_1.Group.aggregate([
        {
            $match: {
                members: {
                    $in: [new mongoose_1.default.Types.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)]
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'members',
                foreignField: '_id',
                as: 'members'
            }
        },
        {
            $lookup: {
                from: 'messages',
                localField: '_id',
                foreignField: 'groupId',
                as: 'messages'
            }
        },
        {
            $addFields: {
                lastMessage: { $arrayElemAt: ['$messages', -1] }
            }
        },
        {
            $sort: {
                'lastMessage.createdAt': -1
            }
        },
        {
            $project: {
                members: {
                    username: 1,
                    email: 1,
                    avatar: 1
                },
                lastMessage: {
                    msg: 1,
                    createdAt: 1
                }
            }
        }
    ]);
    return res.status(200).json(new ApiResponse_1.default(200, group, "Group details fetched successfully"));
}));
exports.viewGroup = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    if (!groupId) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "Invalid group ID"));
    }
    const group = yield group_model_1.Group.findById(groupId).populate([
        {
            path: 'members',
            select: 'username email'
        },
        {
            path: 'owner',
            select: 'username email'
        }
    ]);
    if (!group) {
        return res.status(404).json(new ApiResponse_1.default(404, [], "Group not found"));
    }
    return res.status(200).json(new ApiResponse_1.default(200, group, "Group details fetched successfully"));
}));
