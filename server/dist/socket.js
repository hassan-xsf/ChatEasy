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
const socket_io_1 = require("socket.io");
const app_1 = require("./app");
const message_controller_1 = require("./controllers/message.controller");
const io = new socket_io_1.Server(app_1.server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});
io.on('connection', (socket) => {
    socket.on('joinGroup', (_a) => __awaiter(void 0, [_a], void 0, function* ({ groupId }) {
        socket.join(groupId);
        yield (0, message_controller_1.viewChatHistory)(groupId);
    }));
    socket.on('sendMessage', ({ groupId, msg, from }) => {
        (0, message_controller_1.saveMessage)(groupId, from, msg);
        io.to(groupId).emit('recieveMessage', { msg, from });
    });
    socket.on('leaveGroup', ({ groupId }) => {
        socket.leave(groupId);
    });
});
