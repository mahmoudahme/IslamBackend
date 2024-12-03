import express from "express";
import path from "path"
import fs from 'fs'
import {
  CreateNewVideo,
  deleteVideoBlog,
  getAllVideosBlog,
  getOneVideo,
  updateVideoBlog,
  Likes
}
  from "../Controller/faithVideoController.js";
import multer from "multer";

const uploadDir = 'uploads/Videos';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// إعداد Multer لرفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);; // مجلد تخزين الصور
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // اسم الملف فقط
    console.log(file)
  }
});
const upload = multer({ storage: storage});
const router = express.Router();
  
router.post("/", upload.single('videoName') , CreateNewVideo);
router.post("/:id", Likes);

router.get("/" , getAllVideosBlog);
router.get("/:id" , getOneVideo);
router.put("/:VideoId" ,upload.any('videoName'), updateVideoBlog);
router.delete("/:VideoId" , deleteVideoBlog);
export default router