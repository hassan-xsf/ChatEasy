import { User } from "../models/user.model";
import ApiResponse from "../utilities/ApiResponse";
import { Response } from 'express';
import { asyncHandler } from "../utilities/asyncHandler";
import { CustomRequest } from '../types/request';
import { IUser } from "../models/user.model";
import mongoose from "mongoose";

const generateToken = async (userId: string): Promise<string | null> => {
    const user = await User.findById(userId) as IUser | null;
    if (user) {
        return user.generateAccessToken();
    }
    return null;
};

const registerUser = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { username, email, password , gender } = req.body;
    
    if ([username, email, password].some(field => typeof field !== "string" || field.trim() === "")) {
        return res.status(400).json(
            new ApiResponse(400, [], "All fields are compulsory!")
        );
    }

    const existedUser = await User.findOne({ $or: [{ username: username.toLowerCase() }, { email }] }) as IUser | null;
    if (existedUser) {
        return res.status(400).json(
            new ApiResponse(400, [], "A user with the provided email or username already exists")
        );
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        gender
    });

    const createdUser = await User.findById(user._id).select("-password") as IUser | null;

    if (!createdUser) {
        return res.status(500).json(
            new ApiResponse(500, [], "There was a problem creating the user.")
        );
    }

    return res.status(201).json(
        new ApiResponse(201, { createdUser, config: password }, "User has been created successfully.")
    );
});

// Login user
const loginUser = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json(
            new ApiResponse(400, [], "Please enter a valid email")
        );
    }

    const user = await User.findOne({ email }) as IUser | null;
    if (!user) {
        return res.status(400).json(
            new ApiResponse(400, [], "Invalid email!")
        );
    }
    const match = await user.isPasswordCorrect(password);
    if (!match) {
        return res.status(401).json(
            new ApiResponse(401, [], "Incorrect password!")
        );
    }

    const accessToken = await generateToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password") as IUser | null;

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };

    return res.status(200)
        .cookie("accessToken", accessToken ?? '', options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken
            },
                "User logged in successfully")
        );
});

const logoutUser = asyncHandler(async (req: CustomRequest, res: Response) => {
    if (!req.user || !req.user._id) {
        return res.status(400).json(
            new ApiResponse(400, [], "No user found to log out.")
        );
    }

    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            { new: true }
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, [], "An error occurred while logging out.")
        );
    }

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };

    return res.status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User has been logged out"));
});

const addFriend = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { friendId } = req.params;

    const friendObjectId = new mongoose.Types.ObjectId(friendId);

    if (!friendId) {
        return res.status(404).json(
            new ApiResponse(404, [], "Friend ID not found!")
        );
    }
    const user = await User.findById(req.user?._id).select("-password")
    if (user?.friends?.includes(friendObjectId)) {
        return res.status(400).json(
            new ApiResponse(400, {}, "User is already friended with the person.")
        );
    }

    const friend = await User.findByIdAndUpdate(req.user?._id, {
        $addToSet: {
            friends: friendObjectId,
        }
    })
    return res.status(200).json(
        new ApiResponse(200, { friend }, "Friend has been succesfully added")
    );
})

const removeFriend = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { friendId } = req.params;

    const friendObjectId = new mongoose.Types.ObjectId(friendId);

    if (!friendId) {
        return res.status(404).json(
            new ApiResponse(404, [], "Friend ID not found!")
        );
    }
    const user = await User.findById(req.user?._id).select("-password")
    if (!user?.friends?.includes(friendObjectId)) {
        return res.status(400).json(
            new ApiResponse(400, {}, "You are not friend with that person")
        );
    }

    const friend = await User.findByIdAndUpdate(req.user?._id, {
        $pull: {
            friends: friendObjectId,
        }
    })
    return res.status(200).json(
        new ApiResponse(200, { friend }, "Friend has been succesfully removed")
    );
})

const viewFriends = asyncHandler(async (req: CustomRequest, res: Response) => {
    const userFriends = await User.findById(req.user?._id).select("friends username").populate({
        path: 'friends',
        select: 'username email'
    })
    return res.status(200).json(
        new ApiResponse(200, { userFriends }, "Friend data has been succesfully fetched")
    );
})




// Get Current User
const getCurrentUser = asyncHandler(async (req: CustomRequest, res: Response) => {
    if (!req.user) {
        return res.status(404).json(
            new ApiResponse(404, [], "User not found.")
        );
    }
    const user = await User.findById(req.user._id).select("-password")
    return res.status(200).json(
        new ApiResponse(200, { user }, "User data has been fetched")
    );
});

export { registerUser, loginUser, logoutUser, getCurrentUser, viewFriends, addFriend, removeFriend };
