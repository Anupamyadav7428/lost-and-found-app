import mongoose from "mongoose";
// import { asyncHandler } from "../utils/asyncHandler.js";

const itemSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category:{
            type: String,
            default: "General"
        },
        imageUrl:{
            type: String,
            required: true
        },
        longitude:{
            type: Number, required: true
        },
        longitude:{
            type: Number, required: true
        },
        status: { 
            type: String, enum: ["lost", "found", "claimed"], default: "found" 
        },
        postedBy: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true 
        },
        claimedBy: { 
            type: mongoose.Schema.Types.ObjectId, ref: "User", 
            default: null },
        similarItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    },
    { timestamps: true }
);
export default mongoose.model("Item", itemSchema);