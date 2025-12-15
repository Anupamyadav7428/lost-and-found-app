import Item from "../models/Item.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Notification from "../models/Notification.js";
import User from '../models/User.js';
import Claim from "../models/Claim.js";
import { getIO } from "../utils/socket.js";





const createItem = asyncHandler(async (req, res) => {
    const { title, description, category, latitude, longitude } = req.body;
    // console.log("Req Body:", req.body);
    // console.log("Req File:", req.file);
    if (!req.file) {
        res.status(400);
        throw new Error("Image is required");
    }

    const imageUrl = req.file.path;

    const item = await Item.create({
        title,
        description,
        category,
        longitude,
        latitude,
        imageUrl,
        postedBy: req.user._id
    });
    res.status(201).json({
        success: true,
        message: "Item Uploaded Successfully",
        item,
    });
});




const getItems = asyncHandler(async (req, res) => {
    let query = {}
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { category, status, keyword } = req.query;

    if (category) {
        query.category = category;
    }
    if (status) {
        query.status = status;
    }
    if (keyword) {
        query.title = { $regex: keyword, $options: "i" };
    }

    const items = await Item.find(query)
        .populate("postedBy", "name email avatarUrl")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    res.status(200).json({ success: true, items });
});


const claimItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const io = getIO();

    const item = await Item.findById(itemId);
    if (!item) {
        res.status(400);
        throw new Error("Item not found");
    }
     // 2️⃣ Prevent claiming your own item
    if (item.postedBy.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error("You cannot claim your own item");
    }
    if (item.status === "claimed") {
        res.status(400);
        throw new Error("Item already claimed");
    }
    // 4️⃣ Check if user has already sent a pending claim
    const existingClaim = await Claim.findOne({
        itemId,
        claimerId: req.user._id,
        status: "pending"
    });
    if (existingClaim) {
        res.status(400);
        throw new Error("You already sent a claim request for this item");
    }
    const claim = await Claim.create({
        itemId,
        claimerId: req.user._id,
        status: "pending"
    });
    const notification = await Notification.create({
        userId: item.postedBy,
        type: "claim_request",
        message: `${req.user.name} wants to claim your item "${item.title}"`
    });
    const poster = await User.findById(item.postedBy);
    // const io = req.app.get("io");
    if (poster) {
        poster.notifications.push(notification._id);
        await poster.save();


        io.to(poster._id.toString()).emit("newNotification", {
            message: `${req.user.name} claimed your item "${item.title}"`,
            itemId: item._id,
            isRead: notification.isRead,
            createdAt: notification.createdAt
        });
    }
    res.status(200).json({
        success: true,
        message: "item claim request send Successfully",
        claim,
    });

});



const updateItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const { title, description, category, latitude, longitude } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }

    if (item.postedBy.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("You cannot update someone else's item");
    }

    item.title = title || item.title;
    item.description = description || item.description;
    item.category = category || item.category;
    item.latitude = latitude || item.latitude;
    item.longitude = longitude || item.longitude;

    if (req.file) {
        item.imageUrl = req.file.path;
    }

    await item.save();
    res.status(200).json({
        success: true,
        message: "Item updated successfully",
        item,
    });

});



const deleteItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const item = Item.findById(itemId);

    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }

    if (item.postedBy.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("You cannot delete someone else's item");
    }

    await item.remove();
    res.status(200).json({
        success: true,
        message: "Item deleted successfully",
    });

});

export { createItem, getItems, claimItem, updateItem, deleteItem};