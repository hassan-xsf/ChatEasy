import { Router } from "express";
import { registerUser, loginUser, logoutUser , getCurrentUser , toggleFriend , viewFriends , searchUsers } from "../controllers/user.controller";
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


router.route('/friends/toggle/:friendId')
    .post(
        verifyJWT,
        toggleFriend
    )

// router.route('/friends/remove/:friendId')
//     .patch(
//         verifyJWT,
//         removeFriend
//     )


router.route('/friends')
    .get(
        verifyJWT,
        viewFriends
    )
    
router.route('/search/:username')
    .get(
        verifyJWT,
        searchUsers
    )


export default router;