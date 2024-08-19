"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.route('/register')
    .post(user_controller_1.registerUser);
router.route('/login')
    .post(user_controller_1.loginUser);
router.route('/logout')
    .post(auth_middleware_1.default, user_controller_1.logoutUser);
router.route('/account')
    .get(auth_middleware_1.default, user_controller_1.getCurrentUser);
router.route('/friends/toggle/:friendId')
    .post(auth_middleware_1.default, user_controller_1.toggleFriend);
// router.route('/friends/remove/:friendId')
//     .patch(
//         verifyJWT,
//         removeFriend
//     )
router.route('/friends')
    .get(auth_middleware_1.default, user_controller_1.viewFriends);
router.route('/search/:username')
    .get(auth_middleware_1.default, user_controller_1.searchUsers);
exports.default = router;
