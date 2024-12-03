import Books from "../Model/Faith/Books.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { fileURLToPath } from "url";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { Views } from "../Middleware/UpdateView.js";

export const CreateNewBook = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const { title, description, author } = req.body;
    const files = req.files;
    if (files[0] && files[1]) {
      const newBook = new Books({
        title: title,
        description: description,
        author: author,
        book : files[0].originalname ,
        imageName : files[1].originalname
      });
      await newBook.save();
      res.status(200).json({ message: "New Book Created" });
      
    } else {
      return next(
        new ApiError("You Should Add book and the cover of the Book ", 400)
      );
    }
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError(`Error in Creation${error}`, 400));
  }
};
export const downloadController = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const id = req.params.id;
    const book = await Books.findById(id);
    // استخدم المسار الكامل للملف
    const __filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(__filename);
    const filePath = path.join(
      dirname,
      "..",
      "uploads",
      "books",
      book.bookName
    );
    console.log(filePath);
    res.download(filePath, (err) => {
      if (err) {
        res
          .status(500)
          .json({ message: "خطأ أثناء تحميل الكتاب", error: err.message });
      }
    });
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};
export const getAllBooksBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const bookBlog = await Books.find();
    await Views(bookBlog, Books);

    res.status(200).json({ bookBlog: bookBlog });
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

export const getOneBook = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const id = req.params.id;
    const book = await Books.findById({ _id: id });
    const arr = [book];
    await Views(arr, Books);
    res.status(200).json({ book: book });
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

export const updateBookBlog = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const newBookBlog = await Books.findByIdAndUpdate(
      bookId,
      { $set: req.body},
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Book is Updated", newBookBlog: newBookBlog });

    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteBookBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const BookId = req.params.BookId;
    await Books.findByIdAndDelete({ _id: BookId });
    res.status(200).json({ message: "Book is Deleted" });
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
    const BooksId = req.params.id;
    const BooksBlog = await Books.findById(BooksId);
    const updateLike = await Books.findByIdAndUpdate(
      BooksId,
      { Likes: (BooksBlog.Likes += 1) },
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
