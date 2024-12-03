import express from "express";
import fs from "fs"
import multer from "multer";
import {
createWhytTheyConvert, getAllwhytTheyConvert ,getOneBlog ,updateWhytTheyConvert , deleteWhytTheyConvert ,Likes

} from "../Controller/whyTheyConvertController.js"; 

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

router.post("/",upload.any([{ name: 'image' }, { name: 'video' }]), createWhytTheyConvert);
router.post("/:id", Likes);
router.get("/", getAllwhytTheyConvert);
router.get("/:id", getOneBlog);
router.put("/:id" , updateWhytTheyConvert);
router.delete("/:id",deleteWhytTheyConvert);
export default router;
