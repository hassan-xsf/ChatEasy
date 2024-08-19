import jwt from "jsonwebtoken"
import { Response, NextFunction } from "express"
import ApiResponse from "../utilities/ApiResponse"
import { CustomRequest } from '../types/request';


interface JwtPayload {
    _id: string;
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req?.cookies.accessToken;
        if (!token) {
            return res.status(400).json(
                new ApiResponse(400, [], "No authentication token found")
            )
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
        if (!decodedToken) {
            return res.status(400).json(
                new ApiResponse(400, [], "No authentication token or invalid token found!")
            )
        }
        req.user = {
            _id: decodedToken._id
        }

        next()

    } catch (error) {
        return res.status(400).json(
            new ApiResponse(400, [], "There was a problem verifying token")
        )
    }
}

export default verifyJWT
