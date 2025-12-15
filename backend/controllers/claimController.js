import Item from "../models/Item.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Notification from "../models/Notification.js";
import User from '../models/User.js';
import Claim from "../models/Claim.js";
import { getIO } from "../utils/socket.js";

const rejectClaim=asyncHandler(async(req, res)=>{
    const {claimId}=req.params;
    const claim=await Claim.findById(claimId);
    if(!claim){
        res.status(404);
        throw new Error("Claim not found");
    }
    const item=await Item.findById(claim.itemId);
    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }
    if(item.postedBy.toString()!==req.user._id.toString()){
        res.status(403);
        throw new Error("You cannot reject claims on someone else's item");
    }

    // if(claim.status==="rejected"){
    //     res.status(403);
    //     throw new Error("You cannot reject already rejected item");
    // }
    claim.status="rejected";
    await claim.save();
    const notification=await Notification.create({
        userId: claim.claimerId,
        type:"claim_status",
        message: `Your claim for item "${item.title}" has been rejected`

    });

    const claimer=await User.findById(claim.claimerId);
    if(claimer){
        claimer.notifications.push(notification._id);
        await claimer.save();

        // const io=await req.app.get("io");
        const io=getIO();
        io.to(claimer.id.toString()).emit("newNotification", {
            message: notification.message,
            itemId: item._id,
            isRead: notification.isRead,
            createdAt: notification.createdAt
        });

    }
    res.status(200).json({
        success: true,
        message: "Claim rejected successfully",
        claim
    });
    

});

const approveClaim=asyncHandler(async(req ,res)=>{
    const {claimId}=req.params;


    const claim=await Claim.findById(claimId);
    if(!claim){
        res.status(404);
        throw new Error("Claim not found");
    }

    const item=await Item.findById(claim.itemId);
    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }
    if(item.postedBy.toString()!==req.user._id.toString()){
        res.status(403);
        throw new Error("You cannot approve claims on someone else's item");
    }

    claim.status="approved";
    await claim.save();

    item.status="claimed";
    item.claimedBy = claim.claimerId;
    await item.save();

    const notification=await Notification.create({
        userId:claim.claimerId,
        type: "claim_status",
        message: `Your claim for item "${item.title}" has been approved!`
    });

    const claimer = await User.findById(claim.claimerId);
    if(claimer){
        claimer.notifications.push(notification._id);
        await claimer.save();
        // const io=req.app.get("io");
        const io=getIO();
        io.to(claimer._id.toString()).emit("newNotification",{
            message: notification.message,
            itemId: item._id,
            isRead: notification.isRead,
            createdAt: notification.createdAt
        });
    }
    res.status(200).json({
        success: true,
        message: "Claim approved successfully",
        claim,
        item
    });

});


export {approveClaim, rejectClaim};