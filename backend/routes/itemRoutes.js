import express from "express";
import { claimItem, createItem, deleteItem, getItems, updateItem } from "../controllers/itemController.js";
import isAuth from "../middleware/authMiddleware.js";
import parser from "../utils/multer.js";

const router=express.Router();
router.post("/", isAuth,parser.single("image"), createItem);
router.get("/", getItems);
router.put("/claim/:itemId", isAuth, claimItem);
router.patch("/:itemId", isAuth, parser.single("image"), updateItem);
router.delete("/:itemId", isAuth, deleteItem);


export default router;