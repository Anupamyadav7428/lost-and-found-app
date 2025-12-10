import express from "express";
import {getUserProfile, updateUserProfile, getUserPostedItems, getClaimItems} from "../controllers/userController.js";
import isAuth from "../middleware/authMiddleware.js";

const router=express.Router();
router.get("/profile", isAuth, getUserProfile);
router.put("/profile", isAuth, updateUserProfile);
router.get("/items/posted", isAuth, getUserPostedItems);
router.get("/items/claimed", isAuth, getClaimItems);

export default router;
