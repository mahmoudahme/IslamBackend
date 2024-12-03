import { Views } from "../Middleware/UpdateView.js";
import Haij from "../Model/Pilar of Islam/Haji.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { v2 as cloudinary } from "cloudinary";

export const createHaijBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const { title, description } = req.body;
    const image = req.file.originalname;

    const newHaijBlog = new Haij({
      title: title,
      description: description,
      imageName: image,
    });
    await newHaijBlog.save();
    res.status(200).json({ message: "New Blog Created in The Haij " });
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllHaijBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const HaijBlog = await Haij.find();
    await Views(HaijBlog, Haij);
    res.status(200).json({ HaijBlog: HaijBlog });
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
    const Blog = await Haij.findById({ _id: id });
    const arr = [Blog];
    await Views(arr, Haij);
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

export const updateHaijBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    if (req.files.length > 0) {
      const HaijId = req.params.HaijId;
      const newHaijBlog = await Haij.findByIdAndUpdate(
        HaijId,
        {
          $set: req.body,
          imageName: req.files[0].originalname,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Blog is Updated", newHaijBlog: newHaijBlog });
    } else {
      const HaijId = req.params.HaijId;
      const newHaijBlog = await Haij.findByIdAndUpdate(
        HaijId,
        { $set: req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Blog is Updated", newHaijBlog: newHaijBlog });
    }
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteHaijBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const BlogId = req.params.BlogId;
    await Haij.findByIdAndDelete({ _id: BlogId });
    res.status(200).json({ message: "Blog is Deleted" });
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};

export const Likes = async (req, res, next) => {
  try {
    // verifyToken(req , res , async()=>{
    //   if(req.user){
    const HaijId = req.params.id;
    const HaijBlog = await Haij.findById(HaijId);
    const updateLike = await Haij.findByIdAndUpdate(
      HaijId,
      { Likes: (HaijBlog.Likes += 1) },
      { new: true }
    );
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
};
