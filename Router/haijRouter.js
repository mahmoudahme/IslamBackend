import express from "express";
import fs from "fs"

import {
  createHaijBlog,
  deleteHaijBlog,
  getAllHaijBlog,
  getOneBlog,
  updateHaijBlog ,
  Likes
}
  from "../Controller/haijController.js";
import multer from "multer";

const uploadDir = 'uploads/Images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// إعداد Multer لرفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // مجلد تخزين الصور
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // حفظ الصورة باسمها الأصلي
  }
});
const upload = multer({ storage: storage });
const router = express.Router();
  
router.post("/", upload.single('image') , createHaijBlog);
router.post("/:id", Likes);

router.get("/" , getAllHaijBlog);
router.get("/:id" , getOneBlog)
router.put("/:HaijId", upload.any("image") , updateHaijBlog);
router.delete("/:BlogId" , deleteHaijBlog);
export default router