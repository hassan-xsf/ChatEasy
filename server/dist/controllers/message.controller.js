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
exports.saveMessage = exports.viewChatHistory = exports.viewMessages = exports.createMessage = void 0;
const group_model_1 = require("../models/group.model");
const messsage_model_1 = require("../models/messsage.model");
const ApiResponse_1 = __importDefault(require("../utilities/ApiResponse"));
const asyncHandler_1 = require("../utilities/asyncHandler");
const createMessage = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { message, groupId } = req.params;
    if (message.trim() === "") {
        return res.status(400).json(new ApiResponse_1.default(400, [], "Invalid or no message found!"));
    }
    if (!groupId) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "No group Id found"));
    }
    const group = yield group_model_1.Group.findById(groupId);
    if (!group) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "Invalid group Id found"));
    }
    const createdMessage = yield messsage_model_1.Message.create({
        groupId,
        msg: message,
        from: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
    });
    if (!createdMessage) {
        return res.status(500).json(new ApiResponse_1.default(500, [], "There was a problem sending the message."));
    }
    return res.status(201).json(new ApiResponse_1.default(201, createdMessage, "Message has been sent succesfully!"));
}));
exports.createMessage = createMessage;
const viewMessages = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    if (!groupId) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "No group Id found"));
    }
    const messages = yield messsage_model_1.Message.find({ groupId }).populate({
        path: 'from',
        select: 'username email'
    });
    if (!messages) {
        return res.status(400).json(new ApiResponse_1.default(400, [], "No messages found"));
    }
    return res.status(201).json(new ApiResponse_1.default(201, messages, "Message has been sent succesfully!"));
}));
exports.viewMessages = viewMessages;
const saveMessage = (groupId, from, msg) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield group_model_1.Group.findById(groupId);
    if (!group) {
        return null;
    }
    const createdMessage = yield messsage_model_1.Message.create({
        groupId,
        msg,
        from: from,
    });
    if (!createdMessage) {
        return null;
    }
});
exports.saveMessage = saveMessage;
const viewChatHistory = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!groupId) {
        return [];
    }
    const messages = yield messsage_model_1.Message.find({ groupId });
    if (!messages) {
        return [];
    }
    else
        return messages;
});
exports.viewChatHistory = viewChatHistory;
