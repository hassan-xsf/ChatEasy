import mongoose, { Document, Model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export interface IUser extends Document {
    _id: string,
    username: string,
    email: string,
    password: string,
    gender: string,
    friends?: mongoose.Types.ObjectId[]

    generateAccessToken: () => string;
    isPasswordCorrect: (password: string) => Promise<boolean>;
}


const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }],
}, { timestamps: true })


userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
}

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    if (!this.password) {
      throw new Error("Password is undefined");
    }
  
    return bcrypt.compare(password, this.password);
  };

userSchema.pre<IUser>("save", async function (next) {

    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});





export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)
