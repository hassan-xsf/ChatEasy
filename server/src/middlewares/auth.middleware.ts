import jwt from "jsonwebtoken"
import { Response, NextFunction } from "express"
import ApiResponse from "../utilities/ApiResponse"
import { CustomRequest } from '../types/request';
import { User } from "../models/user.model";

interface JwtPayload {
    _id: string;
}

const verifyJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
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

        const user = await User.findById(decodedToken?._id).select("-password")
        if (!user) {
            new ApiResponse(400, [], "Invalid token found!")
        }
        else {
            req.user = {
                _id: decodedToken._id
            }
        }

        next()

    } catch (error) {
        return res.status(400).json(
            new ApiResponse(400, [], "There was a problem verifying token")
        )
    }
}

export default verifyJWT
