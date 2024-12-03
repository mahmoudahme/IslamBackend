import User from "../Model/User.js";
import { ApiError } from "../Utils/apiError.js";

export const GetAllUsers = async(req , res , next)=>{
  try {
    if(req.user.isAdmin){
      const users = await User.find().select("-password");
      res.status(200).json(users);
    }else{
      return next(new ApiError('You are not an admin' , 400))
    }
  } catch (error) {
    return next(new ApiError(error.message , 500))
  }
}

export const UpdateUser = async(req , res , next)=>{
  try {
    if(req.user.isAdmin){
      const userId = req.params.id; 
      const user = await User.findByIdAndUpdate(userId , req.body , {new : true
        });
        res.status(200).json(user);
    }else{
      return next(new ApiError('You are not an admin' , 400))
    }
  } catch (error) {
    return next(new ApiError(error.message , 500))
  }
}