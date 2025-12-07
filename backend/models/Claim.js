import mongoose from "mongoose";
const claimSchema =new mongoose.Schema({
    itemId: { 
        type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true 
    },
    claimerId: { 
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true 
    },
    status: { 
        type: String, enum: ["pending", "approved", "rejected"], default: "pending" 
    },
    proofNotes: {
        type: String, default: "" 
    },

}, 
{ timestamps: true }
);


export default mongoose.model("Claim", claimSchema);