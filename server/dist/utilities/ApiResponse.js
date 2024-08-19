"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(statusCode, data, message) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}
exports.default = ApiResponse;
