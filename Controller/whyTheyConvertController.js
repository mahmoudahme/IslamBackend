import whytTheyConvert from "../Model/Why They Convert/whytTheyConvert.js";
import { ApiError } from "../Utils/apiError.js";
import { Views } from "../Middleware/UpdateView.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { v2 as cloudinary } from "cloudinary";

export const createWhytTheyConvert = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const { title, description } = req.body;
    const files = req.files;
    if (files[0] && files[1]) {
      const newWhytTheyConvert = new whytTheyConvert({
        title: title,
        description: description,
        imageName: files[0].originalname,
        videoName: files[1].originalname,
      });
      await newWhytTheyConvert.save();
      res.status(200).json({ message: "New Why They Convert Created" });
    } else if (files[0]) {
      if (files[0].fieldname == "video") {

        const newwhytTheyConvert = new whytTheyConvert({
          title: title,
          description: description,
          videoName: files[0].originalname,
        });
        await newwhytTheyConvert.save();
        res.status(200).json({ message: "New why They Convert Created" });
      } else if (files[0].fieldname == "image") {
        const newwhytTheyConvert = new whytTheyConvert({
          title: title,
          description: description,
          imageName: files[0].originalname,
        });
        await newwhytTheyConvert.save();
        res.status(200).json({ message: "New why They Convert Created" });
      }
    } else {
      const newwhytTheyConvert = new whytTheyConvert({
        title: title,
        description: description,
      });
      await newwhytTheyConvert.save();
      res.status(200).json({ message: "New why They Convert Created" });
    }
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError(`Error in Creation${error}`, 400));
  }
};
export const getAllwhytTheyConvert = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const AllwhytTheyConvert = await whytTheyConvert.find();
    await Views(AllwhytTheyConvert, whytTheyConvert);
    res.status(200).json({ News: AllwhytTheyConvert });
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
    const Blog = await whytTheyConvert.findById({ _id: id });
    const arr = [Blog];
    await Views(arr, whytTheyConvert);
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
export const updateWhytTheyConvert = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const newId = req.params.id;
    const newsBlog = await whytTheyConvert.findByIdAndUpdate(
      newId,
      { $set: req.body },
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
export const deleteWhytTheyConvert = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const newId = req.params.id;
    await whytTheyConvert.findByIdAndDelete({ _id: newId });
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
    const newId = req.params.id;
    const newBlog = await whytTheyConvert.findById(newId);
    const updateLike = await whytTheyConvert.findByIdAndUpdate(
      newId,
      { Likes: (newBlog.Likes += 1) },
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
