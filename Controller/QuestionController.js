import Questions from "../Model/Questions.js";
import { ApiError } from "../Utils/apiError.js";


export const CreateQuestion = async(req , res , next)=>{
  try {
    const {Question} = req.body ;
    const newQueation = new Questions({
      question : Question 
    });
    await newQueation.save();
    res.status(200).json({Message :" Your Question is Sent :)"})
  } catch (error) {
    return next(new ApiError("Error in Sending Message" ,400))
  }
}

export const getAllQuestions = async(req , res , next)=>{
  try {
    const AllQuestions = await Questions.find();
    res.status(200).json({Questions : AllQuestions})
  } catch (error) {
    return next(new ApiError("Error in Sending Message" ,400))
  }
}