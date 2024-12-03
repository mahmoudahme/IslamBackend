import express from "express";
import fs from "fs"

import {
  createFastingBlog,
  deleteFastingBlog,
  getAllFastingBlog,
  getOneBlog,
  updateFastingBlog,
  Likes
}
  from "../Controller/fastingController.js";
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
  
router.post("/", upload.single('image') , createFastingBlog);
router.post("/:id", Likes);

router.get("/" , getAllFastingBlog);
router.get("/:id" , getOneBlog)
router.put("/:FastingId", upload.any("image") , updateFastingBlog);
router.delete("/:BlogId" , deleteFastingBlog);
export default router