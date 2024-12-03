import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  courseImage: {
    type : String , 
    requried :  true 
  },
  courseFile: {
    type: String,
    required: true,
  },

});

export default mongoose.model("Course", courseSchema);
