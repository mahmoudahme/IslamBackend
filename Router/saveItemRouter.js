import express from "express";
import { createSaveItem, getMySaveItem , deleteOneFromSavedItem } from "../Controller/SavedItemController.js";
const router = express.Router();

router.post("/:programId", createSaveItem);
router.get("/", getMySaveItem);
router.delete("/:id" , deleteOneFromSavedItem);
export default router