import { Request, Response } from 'express';
import { asyncHandler } from "../utilities/asyncHandler";
import { Group } from "../models/group.model";
import ApiResponse from "../utilities/ApiResponse";
import { CustomRequest } from '../types/request';

export const createGroup = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { name, members } = req.body;
    if (!name || !Array.isArray(members)) {
        return res.status(400).json(
            new ApiResponse(400, [], "Invalid group name or member IDs")
        );
    }

    const existingGroup = await Group.findOne({
        members: { $all: members }
      });
    
      if (existingGroup) {
        return res.status(200).json(
          new ApiResponse(200, existingGroup , "Group already existed!")
        );
      }

    const owner = req.user?._id;

    if (!owner) {
        return res.status(403).json(
            new ApiResponse(403, [], "You must be logged in to create a group")
        );
    }

    const group = await Group.create({
        name,
        owner,
        members
    });

    return res.status(201).json(
        new ApiResponse(201, group, "Group has been created successfully")
    );
});

export const viewGroups = asyncHandler(async (req: CustomRequest, res: Response) => {
    const group = await Group.find({
        members: { $in: [req.user?._id] }
    }).populate([
        {
            path: 'members',
            select: 'username email avatar',
        },
        {
            path: 'owner',
            select: 'username email avatar'
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, group, "Group details fetched successfully")
    );
});

export const viewGroup = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { groupId } = req.params;
    if (!groupId) {
        return res.status(400).json(
            new ApiResponse(400, [], "Invalid group ID")
        );
    }
    const group = await Group.findById(groupId).populate([
        {
            path: 'members',
            select: 'username email'
        },
        {
            path: 'owner',
            select: 'username email'
        }
    ]);

    if (!group) {
        return res.status(404).json(
            new ApiResponse(404, [], "Group not found")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, group, "Group details fetched successfully")
    );
});