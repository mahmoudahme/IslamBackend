import mongoose from "mongoose";
const videoSchema = new mongoose.Schema(
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

    video: {
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
export default mongoose.model("FaithVideos" , videoSchema);
