import { Router } from "express";
import { createMessage, viewMessages } from "../controllers/message.controller";
import verifyJWT from '../middlewares/auth.middleware'

const router = Router();

router.use(verifyJWT)

router.route('/send/:message/:groupId')
    .post(
        createMessage,
    )

router.route('/all/:groupId')
    .get(
        viewMessages
    )


export default router;