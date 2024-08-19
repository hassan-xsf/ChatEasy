import { Router } from "express";
import { registerUser, loginUser, logoutUser , getCurrentUser } from "../controllers/user.controller";
import verifyJWT from '../middlewares/auth.middleware'

const router = Router();

router.route('/register')
    .post(
        registerUser,
    )

router.route('/login')
    .post(
        loginUser,
    )

router.route('/logout')
    .post(
        verifyJWT,
        logoutUser
    )

router.route('/account')
    .get(
        verifyJWT,
        getCurrentUser
    )

export default router;