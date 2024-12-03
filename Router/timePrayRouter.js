import express from "express";

import {getAzkar} from "../Controller/prayTimecontroller.js";

const router = express.Router();

//router.get("/timing", Timing);
router.get("/", getAzkar);
//router.get("/quran", getQuran);
export default router;
