import express from "express";
import { GetAllUsers , UpdateUser } from "../Controller/userController.js";
import { verifyToken } from "../Utils/verifyToken.js";

const router = express.Router();
router.get("/", verifyToken, GetAllUsers);
router.put("/:id", verifyToken, UpdateUser);

export default router;