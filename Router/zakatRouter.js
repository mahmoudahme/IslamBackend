import express from "express";
import fs from "fs";
import {
  createZakatBlog,
  deleteZakatBlog,
  getAllZakatBlog,
  getOneBlog,
  updateZakatBlog,
  Likes
}
  from "../Controller/zakatController.js";
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
  
router.post("/", upload.single('image') , createZakatBlog);
router.post("/:id", Likes);

router.get("/" , getAllZakatBlog);
router.get("/:id" , getOneBlog)
router.put("/:ZakatId" , upload.any("image"), updateZakatBlog);
router.delete("/:BlogId" , deleteZakatBlog);
export default router