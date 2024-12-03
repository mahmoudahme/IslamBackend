import express from "express";
import { CreateQuestion, getAllQuestions } from "../Controller/QuestionController.js";

const router = express.Router();
router.post("/", CreateQuestion);
router.get("/", getAllQuestions);

export default router;
