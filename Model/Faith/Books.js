import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    book:{
      type: String,
      required: true,
    },
    imageName : {
      type: String,
      required: true,
    },
    Likes: {
      type : Number ,
      default : 0 
    },
    Views : {
      type: Number ,
      default : 0 
    }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("FaithBooks" , bookSchema);
