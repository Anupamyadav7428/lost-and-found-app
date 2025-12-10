import express from "express";
import isAuth from "../middleware/authMiddleware.js";
import { getNotifications, markNotificationRead } from "../controllers/Notification.js";

const router=express.Router();
router.get("/", isAuth, getNotifications);
router.put("/read/:id", isAuth, markNotificationRead);

export default router;
