import { Views } from "../Middleware/UpdateView.js";
import Prayer from "../Model/Pilar of Islam/Prayer.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { v2 as cloudinary } from "cloudinary";

export const createPrayerBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const { title, description } = req.body;
    const image = req.file.originalname;

    const newPrayerBlog = new Prayer({
      title: title,
      description: description,
      imageName: image,
    });
    await newPrayerBlog.save();
    res.status(200).json({ message: "New Blog Created in The Prayer " });
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllPrayerBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const PrayerBlog = await Prayer.find();
    await Views(PrayerBlog, Prayer);
    res.status(200).json({ PrayerBlog: PrayerBlog });
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};

export const getOneBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const id = req.params.id;
    const Blog = await Prayer.findById({ _id: id });
    const arr = [Blog];
    await Views(arr, Prayer);

    res.status(200).json({ Blog: Blog });
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};

export const updatePrayerBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    if (req.files.length > 0) {
      const PrayerId = req.params.prayerId;
      const newPrayerBlog = await Prayer.findByIdAndUpdate(
        PrayerId,
        {
          $set: req.body,
          imageName: req.files[0].originalname,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Blog is Updated", newPrayerBlog: newPrayerBlog });
    } else {
      const PrayerId = req.params.prayerId;
      const newPrayerBlog = await Prayer.findByIdAndUpdate(
        PrayerId,
        { $set: req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Blog is Updated", newPrayerBlog: newPrayerBlog });
    }
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deletePrayerBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const BlogId = req.params.BlogId;
    await Prayer.findByIdAndDelete({ _id: BlogId });
    res.status(200).json({ message: "Blog is Deleted" });
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const Likes = async (req, res, next) => {
  try {
    // verifyToken(req , res , async()=>{
    //   if(req.user){
    const PrayerId = req.params.id;
    const PrayerBlog = await Prayer.findById(PrayerId);
    const updateLike = await Prayer.findByIdAndUpdate(
      PrayerId,
      { Likes: (PrayerBlog.Likes += 1) },
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
