import { Views } from "../Middleware/UpdateView.js";
import Fasting from "../Model/Pilar of Islam/RamadanFasting.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { v2 as cloudinary } from "cloudinary";

export const createFastingBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const { title, description } = req.body;
    const image = req.file.originalname;

    const newFastingBlog = new Fasting({
      title: title,
      description: description,
      imageName: image,
    });
    await newFastingBlog.save();
    res.status(200).json({ message: "New Blog Created in The Fasting " });

    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllFastingBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const FastingBlog = await Fasting.find();
    await Views(FastingBlog, Fasting);
    res.status(200).json({ FastingBlog: FastingBlog });
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
    const Blog = await Fasting.findById({ _id: id });
    const arr = [Blog];
    await Views(arr, Fasting);
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

export const updateFastingBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    if (req.files.length > 0) {
      const FastingId = req.params.FastingId;
      const newFastingBlog = await Fasting.findByIdAndUpdate(
        FastingId,
        {
          $set: req.body,
          imageName: req.files[0].originalname,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Blog is Updated",
        newFastingBlog: newFastingBlog,
      });
    } else {
      const FastingId = req.params.FastingId;
      const newFastingBlog = await Fasting.findByIdAndUpdate(
        FastingId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({
        message: "Blog is Updated",
        newFastingBlog: newFastingBlog,
      });
    }
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteFastingBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const BlogId = req.params.BlogId;
    await Fasting.findByIdAndDelete({ _id: BlogId });
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
    const FastingId = req.params.id;
    const FastingBlog = await Fasting.findById(FastingId);
    const updateLike = await Fasting.findByIdAndUpdate(
      FastingId,
      { Likes: (FastingBlog.Likes += 1) },
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
