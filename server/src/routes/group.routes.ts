import { Router } from "express";
import { createGroup, viewGroup } from "../controllers/group.controller";

import verifyJWT from '../middlewares/auth.middleware'

const router = Router();

router.use(verifyJWT)


router.route('/my')
    .post(
        createGroup,
    )


router.route('/create')
    .post(
        createGroup,
    )

router.route('/view/:groupId')
    .get(
        viewGroup
    )


export default router;