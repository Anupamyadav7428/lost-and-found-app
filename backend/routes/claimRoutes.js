import express from "express";
import { approveClaim, rejectClaim } from "../controllers/claimController.js";
import  isAuth  from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/approve/:claimId", isAuth, approveClaim);
router.patch("/reject/:claimId", isAuth, rejectClaim);

export default router;
