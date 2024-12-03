import express from "express";
import fs from "fs"
import multer from "multer";
import path from "path";

import {
  createProgram,
  deleteProgram,
  getAllPrograms,
  getOneProgram,
  updatePrograms ,
  getProgramByCategory ,
  Likes,
  numberOfDownloads
} from "../Controller/ProgramController.js"; 
import { verifyToken } from "../Utils/verifyToken.js";

// إعداد Multer لرفع الصور
const uploadDir = 'uploads/Programs';
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
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/", upload.any([{ name: 'programImage' },{ name: 'programFile' }]), createProgram); 
router.post("/:id", Likes);
router.get("/" ,getAllPrograms);
router.get("/category/", getProgramByCategory);
router.get("/:id", getOneProgram);
router.put("/:programId", updatePrograms);
router.delete("/:programId", deleteProgram);
router.put("/download/:id" , numberOfDownloads)
export default router;
