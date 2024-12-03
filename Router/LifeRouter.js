import express from "express";
import fs from "fs"
import {
  createLifeBlog,
  deleteLifeBlog,
  getAllLifeBlog,
  getOneBlog,
  updateLifeBlog,
  Likes
}
  from "../Controller/LifeController.js";

const router = express.Router();
  
router.post("/", createLifeBlog);
router.post("/:id", Likes);

router.get("/" , getAllLifeBlog);
router.get("/:id" , getOneBlog)
router.put("/:LifeId", updateLifeBlog);
router.delete("/:BlogId" , deleteLifeBlog);
export default router