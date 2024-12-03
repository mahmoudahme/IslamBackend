import express from "express";
import path from "path"
import fs from 'fs'
import {
  CreateNewBook,
  deleteBookBlog,
  downloadController,
  getAllBooksBlog,
  getOneBook,
  updateBookBlog ,
  Likes
}
  from "../Controller/faithBookController.js";
import multer from "multer";

const uploadDir = 'uploads/books';
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
  }
});
const upload = multer({ storage: storage });
const router = express.Router();
  
router.post("/", upload.any([{ name: 'bookName' }, { name: 'image' }]) , CreateNewBook);
router.post("/:id", Likes);
router.get("/" , getAllBooksBlog);
router.get("/:id" , getOneBook);
router.get("/download/:id" , downloadController)
router.put("/:bookId" ,updateBookBlog);
router.delete("/:BookId" , deleteBookBlog);
export default router