import { Request } from "express";

export interface IUserBase {
    _id: string;
}

export interface CustomRequest extends Request {
    user?: IUserBase;
}
