import { Views } from "../Middleware/UpdateView.js";
import Certificate from "../Model/Pilar of Islam/Certificate.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { v2 as cloudinary } from "cloudinary";

export const createCertificateBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const { title, description } = req.body;
    const newCertificateBlog = new Certificate({
      title: title,
      description: description,
      imageName: req.file.originalname,
    });
    await newCertificateBlog.save();
    res.status(200).json({ message: "New Blog Created in The Certificate " });

    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllCertificateBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const CertificateBlog = await Certificate.find();
    await Views(CertificateBlog, Certificate);
    res.status(200).json({ CertificateBlog: CertificateBlog });
    // } else {
    //   return next(new ApiError("You are not Authentcator to use this Feature", 404))
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
    const Blog = await Certificate.findById({ _id: id });
    const arr = [Blog];
    await Views(arr, Certificate);
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

export const updateCertificateBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    if (req.files.length > 0) {
      const CertificateId = req.params.CertificateId;
      const newCertificateBlog = await Certificate.findByIdAndUpdate(
        CertificateId,
        {
          $set: req.body,
          imageName: req.files[0].originalname,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Blog is Updated",
        newCertificateBlog: newCertificateBlog,
      });
    } else {
      const CertificateId = req.params.CertificateId;
      const newCertificateBlog = await Certificate.findByIdAndUpdate(
        CertificateId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({
        message: "Blog is Updated",
        newCertificateBlog: newCertificateBlog,
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
export const deleteCertificateBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const BlogId = req.params.BlogId;
    await Certificate.findByIdAndDelete({ _id: BlogId });
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
    const CertificateId = req.params.id;
    const CertificateBlog = await Certificate.findById(CertificateId);
    const updateLike = await Certificate.findByIdAndUpdate(
      CertificateId,
      { Likes: (CertificateBlog.Likes += 1) },
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
