import mongoose from "mongoose";


const notificationSchema =new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    type: { 
        type: String, 
        enum: ["claim_request", "approve", "rejected"],
        required: true 
    },
    message: { type: String, required: true },
    refrenceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Claim"
    },
    isRead: { type: Boolean, default: false },
    

},
{ timestamps: true }
);


export default mongoose.model("Notification", notificationSchema);