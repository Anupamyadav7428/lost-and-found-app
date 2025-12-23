import { verifyEmail, verifyPhone } from "../controllers/authController.js";
import sendMail from "../utils/sendMail.js";
import sendSMS from "../utils/sendSms.js";
import express from "express";
import isAuth from "../middleware/authMiddleware.js";


const router=express.Router();

// router.post("/email/send",  sendMail);
router.post("/email",  verifyEmail);
// router.post("/phone/send",  sendSMS);
router.post("/phone",  verifyPhone);

export default router;