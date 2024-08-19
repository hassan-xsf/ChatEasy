import mongoose , {Document, Model} from "mongoose";

interface IGroup extends Document {
    name: string,
    owner: mongoose.Types.ObjectId,
    members: mongoose.Types.ObjectId[],
}

const groupSchema = new mongoose.Schema<IGroup>({
    name: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

export const Group = mongoose.model("Group" , groupSchema)