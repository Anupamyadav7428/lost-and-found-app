import express from "express";
import { approveClaim, rejectClaim, getClaimById } from "../controllers/claimController.js";
import  isAuth  from "../middleware/authMiddleware.js";
const router = express.Router();

router.patch("/approve/:claimId", isAuth, approveClaim);
router.patch("/reject/:claimId", isAuth, rejectClaim);
router.get("/:claimId", isAuth, getClaimById);

export default router;
