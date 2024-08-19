
import { Group } from "../models/group.model";
import { Message } from "../models/messsage.model";
import ApiResponse from "../utilities/ApiResponse";
import { Response } from 'express';
import { asyncHandler } from "../utilities/asyncHandler";
import { CustomRequest } from '../types/request';


const createMessage = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { message, groupId } = req.params;
    if (message.trim() === "") {
        return res.status(400).json(
            new ApiResponse(400, [], "Invalid or no message found!")
        );
    }
    if (!groupId) {
        return res.status(400).json(
            new ApiResponse(400, [], "No group Id found")
        );
    }
    const group = await Group.findById(groupId)
    if (!group) {
        return res.status(400).json(
            new ApiResponse(400, [], "Invalid group Id found")
        );
    }
    const createdMessage = await Message.create({
        groupId,
        msg: message,
        from: req.user?._id
    })
    if (!createdMessage) {
        return res.status(500).json(
            new ApiResponse(500, [], "There was a problem sending the message.")
        );
    }
    return res.status(201).json(
        new ApiResponse(201, createdMessage, "Message has been sent succesfully!")
    );
});

const viewMessages = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { groupId } = req.params;
    if (!groupId) {
        return res.status(400).json(
            new ApiResponse(400, [], "No group Id found")
        );
    }
    const messages = await Message.find({groupId}).populate({
        path: 'from',
        select: 'username email'
    })
    if(!messages) {
        return res.status(400).json(
            new ApiResponse(400, [], "No messages found")
        );   
    }
    return res.status(201).json(
        new ApiResponse(201, messages , "Message has been sent succesfully!")
    );
})

export { createMessage, viewMessages };
