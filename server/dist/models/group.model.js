"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User"
        }]
});
exports.Group = mongoose_1.default.model("Group", groupSchema);
