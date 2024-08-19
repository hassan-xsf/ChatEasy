import { Router } from "express";
import { registerUser, loginUser, logoutUser , getCurrentUser , addFriend , removeFriend , viewFriends } from "../controllers/user.controller";
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


router.route('/friends/add/:friendId')
    .post(
        verifyJWT,
        addFriend
    )

router.route('/friends/remove/:friendId')
    .patch(
        verifyJWT,
        removeFriend
    )


router.route('/friends')
    .get(
        verifyJWT,
        viewFriends
    )



export default router;