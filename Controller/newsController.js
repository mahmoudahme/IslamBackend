import News from "../Model/News/News.js";
import { ApiError } from "../Utils/apiError.js";
import { Views } from "../Middleware/UpdateView.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { v2 as cloudinary } from "cloudinary";

export const createNews = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const { title, description } = req.body;
        const files = req.files;
        if (files[0] && files[1]) {
          
          const newNews = new News({
            title: title,
            description: description,
            imageName: files[0].originalname,
            videoName: files[1].originalname,
          });
          await newNews.save();
          res.status(200).json({ message: "New News Created" });
        } else if (files[0]) {
          if (files[0].fieldname == "video") {
            
            const newNews = new News({
              title: title,
              description: description,
              videoName: files[0].originalname,
            });
            await newNews.save();
            res.status(200).json({ message: "New News Created" });
          } else if (files[0].fieldname == "image") {
            const newNews = new News({
              title: title,
              description: description,
              imageName: files[0].originalname,
            });
            await newNews.save();
            res.status(200).json({ message: "New News Created" });
          }
        } else {
          const newNews = new News({
            title: title,
            description: description,
          });
          await newNews.save();
          res.status(200).json({ message: "New News Created" });
        }
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError(`Error in Creation${error}`, 400));
  }
};
export const getAllNews = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const AllNews = await News.find();
        await Views(AllNews, News);
        res.status(200).json({ News: AllNews });
    //   } else {
    //     return next(
    //       new ApiError("You are not Authentcator to use this Feature", 404)
    //     );
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};
export const getOneBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const id = req.params.id;
        const Blog = await News.findById({ _id: id });
        const arr = [Blog];
        await Views(arr, News);
        res.status(200).json({ Blog: Blog });
    //   } else {
    //     return next(
    //       new ApiError("You are not Authentcator to use this Feature", 404)
    //     );
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};
export const updateNews = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const newId = req.params.id
        const newsBlog = await News.findByIdAndUpdate(
          newId,
          { $set: req.body},
          { new: true }
        );
        res.status(200).json({
          message: "Blog is Updated",
          newmonothesimBlog: newsBlog,
        });
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteNews = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const newId = req.params.id;
        await News.findByIdAndDelete({ _id: newId });
        res.status(200).json({ message: "Blog is Deleted" });
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const Likes = async(req , res , next )=>{
  try {
    // verifyToken(req , res , async()=>{
    //   if(req.user){
        const newId = req.params.id ;
        const newBlog = await News.findById(newId);
        const updateLike = await News.findByIdAndUpdate(
          newId ,
          {Likes : newBlog.Likes+=1 },
          {new : true}
        )
        res.status(200).json({
          message: "Likes is Updated",
          newmonothesimBlog: updateLike,
        });
    //   }else{
    //     new ApiError("You are not Authentcator to use this Feature", 404)
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Like Try Again Later", 400));
  }
}
