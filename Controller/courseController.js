import Course from "../Model/Programs/Course.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createCourse = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const { courseName, description} = req.body;
        const newFile =  req.files ;
        console.log(newFile) 
        const newCourse = new Course({
          courseName : courseName ,
          description: description , 
          courseImage : newFile[0].originalname ,
          courseFile : newFile[1].originalname 
        });
        await newCourse.save();  
        res.status(200).json({ message: "New Course Created in The Courses " })
      // } else {
      //   return next(new ApiError("You are not Admin to us e this Feature", 404))
      // }
    // })

  } catch (error) {
    return next(new ApiError(`Error in Creation ${error}`, 400))
  }
}; 

export const getAllCourses = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const Courses = await Course.find();
        res.status(200).json({ Courses: Courses })
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
};

export const getOneCourse = async(req , res , next)=>{
  try {
 //   verifyToken(req, res, async () => {
 //     if (req.user) {
        const CourseId = req.params.CourseId
        const oneCourse = await Course.findById(CourseId);
        res.status(200).json({ Courses: oneCourse })
 //     } else {
 //       return next(new ApiError("You are not Authentcator to use this Feature", 404))
 //     }
 //   })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
}

export const updateCourses = async (req, res, next) => {
  try {
 //   verifyToken(req, res, async () => {
 //     if (req.user.isAdmin) {
        const CourseId = req.params.CourseId;
        const CourseUpdated = await Course.findByIdAndUpdate(
          CourseId,
          { $set: req.body },
          { new: true });
        res.status(200).json({ message: "Course is Updated", CourseUpdated: CourseUpdated })
      //}else{
       /// return next(new ApiError("You are not Admin to use this Feature", 404))
     // }
   // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}
export const deleteCourse = async (req, res, next) => {
  try {
  //  verifyToken(req, res, async () => {
  //    if (req.user.isAdmin) {
        const CourseId = req.params.CourseId;
         await Course.findByIdAndDelete({_id : CourseId})
        res.status(200).json({ message: "Course is Deleted"})
  //    }else{
  //      return next(new ApiError("You are not Admin to use this Feature", 404))
  //    }
  //  })
  } catch (error) { 
    return next(new ApiError("Error in Update", 400))
  }
}
