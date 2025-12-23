import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Item from "../models/Item.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../controllers/authController.js"


const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -phoneOTP -phoneOTPExpires -phoneVerified -emailVerified -role");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        success: true,
        user
    });

});


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (req.body.email && req.body.email !== user.email) {
        const emailExists = await User.findOne({ email: req.body.email });

        if (emailExists) {
            res.status(400);
            throw new Error("Email already taken by another user");
        }

        user.email = req.body.email;
    }
    // else{
    //     return  res.status(200).json({
    //         success: true,
    //         message: "User same as previous"
    //     });
    // }
    user.name = req.body.name || user.name;
    user.phone=req.body.phone|| user.phone;
    if (req.body.avatarUrl) user.avatarUrl = req.body.avatarUrl;

    if (req.body.password) {
        const salt = bcrypt.genSalt(10);
        user.password = bcrypt.hash(req.user.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
        success: true,
        user: updatedUser,
        token: generateToken(updatedUser._id)
    });
});

const getUserPostedItems = asyncHandler(async (req, res) => {
    const Items = await Item.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        Items
    });

});

const getClaimItems = asyncHandler(async (req, res) => {
    const Items = await Item.find({ claimedBy: req.user._id });
    res.status(200).json({
        success: true,
        Items
    });
});


export { getUserProfile, updateUserProfile, getUserPostedItems, getClaimItems };