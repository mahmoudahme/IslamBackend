import mongoose from "mongoose";

const whytTheyConvertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    imageName: {
      type: String,
    },

    videoName: {
      type: String,
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

export default mongoose.model("whytTheyConvert" , whytTheyConvertSchema)
