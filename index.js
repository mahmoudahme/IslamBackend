import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
import { DBConnection } from "./Config/DbConnection.js";
import { globalError } from "./Middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import axios from "axios";

import authRouter from "./Router/authRouter.js";
import monothesimBlogRouter from "./Router/monothesimBlogRouter.js";
import PrayerRouter from "./Router/PrayerRouter.js";
import CertificateRouter from "./Router/CertificateRouter.js";
import zakatRouter from "./Router/zakatRouter.js";
import fastingRouter from "./Router/fastingRouter.js";
import haijRouter from "./Router/haijRouter.js";
import bookRouter from "./Router/bookRouter.js";
import VideoRouter from "./Router/VideoRouter.js";
import LifeRouter from "./Router/LifeRouter.js";
import NewsRouter from "./Router/NewsRouter.js";
import ProgramRouter from "./Router/ProgramRouter.js";
import couserRouter from "./Router/couserRouter.js";
import timePrayRouter from "./Router/timePrayRouter.js";
import whyTheyConvertRouter from "./Router/whyTheyConvertRouter.js";
import questionRouter from "./Router/questionRouter.js";
import saveItemRouter from "./Router/saveItemRouter.js";
import userRouter from "./Router/userRouter.js";
import messageRouter from "./Router/messageRouter.js";

configDotenv({ path: "Config/config.env" });
const app = express();
DBConnection();
app.use(
  cors({
origin : ["http://localhost:3000","http://147.79.101.225:3000"],
    credentials: true,
 // تأكد من تفعيل إرسال الـ cookies
  })
);
//app.use(cors());
//app.use(cors());

const PORT = process.env.PORT || 2000;
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
app.use(express.static("public"));
app.use("/images", express.static(path.join(dirname, "images")));
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log("Mode : Development");
} else if (process.env.NODE_ENV == "production") {
  app.use(morgan("dev"));
  console.log("Mode : Production");
}

app.use("/api/auth/", authRouter);
app.use("/api/monotheismBlog/", monothesimBlogRouter);
app.use("/api/prayerBlog/", PrayerRouter);
app.use("/api/certificateBlog/", CertificateRouter);
app.use("/api/zakatBlog/", zakatRouter);
app.use("/api/fastingBlog/", fastingRouter);
app.use("/api/haijBlog/", haijRouter);
app.use("/api/faithBook/", bookRouter);
app.use("/api/faithVideo/", VideoRouter);
app.use("/api/lifeBlogs/", LifeRouter);
app.use("/api/news/", NewsRouter);
app.use("/api/programs/", ProgramRouter);
app.use("/api/course/", couserRouter);
app.use("/api/azkar/", timePrayRouter);
app.use("/api/convert/", whyTheyConvertRouter);
app.use("/api/question/", questionRouter);
app.use("/api/saveitem/", saveItemRouter);
app.use("/api/user/", userRouter);
app.use("/api/message/", messageRouter);


//global error Middleware
app.use(globalError);

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT} ! `);
});
