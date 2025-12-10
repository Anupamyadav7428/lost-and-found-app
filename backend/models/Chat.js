import mongoose from "mongoose";

const chatSchema=new mongoose.Schema({
    roomId:{
        type: String,
        required: true,
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId, ref:"User",
        required: true
    },
    message:{
        type: String,
        required: true,
        seenStatus: {
            type: Boolean,
            default: false
        }
    }
},
{timestamps: true}
);

export default mongoose.model("Chat", chatSchema);