import mongoose , {Document,Model} from "mongoose";
import bcrypt from 'bcrypt'

interface IUser extends Document{
    username: string,
    email: string,
    password: string,
    friends: mongoose.Types.ObjectId[]
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
    password: {
        type: String,
        required: true,
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }],
}, { timestamps: true })

userSchema.pre<IUser>("save", async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  


export const User : Model<IUser> = mongoose.model<IUser>("User", userSchema)