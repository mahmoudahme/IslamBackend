import express from "express";
import fs from "fs"
import multer from "multer";
import path from "path";

import {
  createCourse , getAllCourses ,getOneCourse , deleteCourse , updateCourses

} from "../Controller/courseController.js"; 
const uploadDir = 'uploads/Couse';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// إعداد Multer لرفع الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // مسار حفظ الملفات
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);// اسم الملف
    console.log(file)
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/", upload.any([{ name: 'courseImage' }, { name: 'courseFile' }]), createCourse); 
router.get("/", getAllCourses);
router.get("/:CourseId", getOneCourse);
router.put("/:CourseId", updateCourses);
router.delete("/:CourseId", deleteCourse);
export default router;

