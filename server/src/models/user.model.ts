import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    }
} , {timestamps: true})

userSchema.pre("save" , async function() {
    if(!this.isModified("password")) return;
    await bcrypt.hash(this.password,10)
})


export const User = mongoose.model("User" , userSchema)