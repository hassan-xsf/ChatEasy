"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/* ROUTES */
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use('/api/v1/users', user_routes_1.default);
const group_routes_1 = __importDefault(require("./routes/group.routes"));
app.use('/api/v1/group', group_routes_1.default);
const message_routes_1 = __importDefault(require("./routes/message.routes"));
app.use('/api/v1/message', message_routes_1.default);
const server = (0, http_1.createServer)(app);
exports.server = server;
