"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const group_controller_1 = require("../controllers/group.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.use(auth_middleware_1.default);
router.route('/create')
    .post(group_controller_1.createGroup);
router.route('/view/:groupId')
    .get(group_controller_1.viewGroup);
exports.default = router;
