import mongoose , {Document , Model} from 'mongoose'


interface IMessage extends Document {
    _id: string,
    groupId: mongoose.Types.ObjectId,
    from: mongoose.Types.ObjectId,
    msg: string,
}

const messageSchema = new mongoose.Schema<IMessage>({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    msg: {
        type: String,
        required: true
    }
} , {timestamps: true})

export const Message = mongoose.model("Message" , messageSchema)