import Zakat from "../Model/Pilar of Islam/Zakat.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { Views } from "../Middleware/UpdateView.js";
import { v2 as cloudinary } from "cloudinary";

export const createZakatBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const { title, description } = req.body;
    const image = req.file.originalname;

    const newZakatBlog = new Zakat({
      title: title,
      description: description,
      imageName: image,
    });
    await newZakatBlog.save();
    res.status(200).json({ message: "New Blog Created in The Zakat " });

    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllZakatBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const ZakatBlog = await Zakat.find();
    await Views(ZakatBlog, Zakat);
    res.status(200).json({ ZakatBlog: ZakatBlog });
    // } else {
    //   return next(
    //     new ApiError("You are not Authentcator to use this Feature", 404)
    //   );
    // }
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
    const Blog = await Zakat.findById({ _id: id });
    const arr = [Blog];
    await Views(arr, Zakat);
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

export const updateZakatBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    if (req.files.length > 0) {
      const ZakatId = req.params.ZakatId;
      const newZakatBlog = await Zakat.findByIdAndUpdate(
        ZakatId,
        {
          $set: req.body,
          imageName: req.files[0].originalname,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Blog is Updated",
        newZakatBlog: newZakatBlog,
      });
    } else {
      const ZakatId = req.params.ZakatId;
      const newZakatBlog = await Zakat.findByIdAndUpdate(
        ZakatId,
        { $set: req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Blog is Updated", newZakatBlog: newZakatBlog });
    }
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteZakatBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const BlogId = req.params.BlogId;
    await Zakat.findByIdAndDelete({ _id: BlogId });
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
    const ZakatId = req.params.id;
    const ZakatBlog = await Zakat.findById(ZakatId);
    const updateLike = await Zakat.findByIdAndUpdate(
      ZakatId,
      { Likes: (ZakatBlog.Likes += 1) },
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
