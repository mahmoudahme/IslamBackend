import express from "express";
import fs from "fs"
import multer from "multer";
import {
  createMonothesimBlog,
  getAllMonothesimBlog,
  getOneBlog,
  updateMonothesimBlog,
  deleteMonothesimBlog,
  Likes,
} from "../Controller/monothesimBlogsController.js"; 

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
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/",upload.single("image"), createMonothesimBlog);
router.post("/:id", Likes);
router.get("/", getAllMonothesimBlog);
router.get("/:id", getOneBlog);
router.put("/:verseId",upload.any("image"),  updateMonothesimBlog);
router.delete("/:BlogId",deleteMonothesimBlog);
export default router;
