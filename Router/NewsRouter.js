import express from "express";
import fs from "fs"
import multer from "multer";
import {
createNews,
  deleteNews,
getAllNews,
getOneBlog,
updateNews,
Likes

} from "../Controller/newsController.js"; 

const uploadDir = 'uploads/News';
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

router.post("/",upload.any([{ name: 'image' }, { name: 'video' }]), createNews);
router.post("/:id", Likes);
router.get("/", getAllNews);
router.get("/:id", getOneBlog);
router.put("/:id" , updateNews);
router.delete("/:id",deleteNews);
export default router;
