"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('joinRoom', (room) => {
        socket.join(room);
        io.to(room).emit('msgRoom', `UserID: ${socket.id} has joined the room`);
    });
    socket.on('disconnect', () => {
        socket.rooms.forEach((room) => {
            if (room !== socket.id) // The client itself, In socket basiccally whenever a client joins it sets it's room equal to it's ID.
                io.to(room).emit('msgRoom', `UserID: ${socket.id} has left the room`);
        });
    });
    socket.on('msgRoom', ({ room, msg }) => {
        io.to(room).emit('msgRoom', msg);
    });
});
server.listen(3000, () => {
    console.log("Server is running on port: " + 3000);
});
