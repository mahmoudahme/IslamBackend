import mongoose from "mongoose";

const monothesimBlogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageName:{
    type: String,
  },
  surah: {
    type: String,
  },
  contentEnglish: {
    type: String,
  },
  contentArabic: {
    type: String,
  },
  NumberOfVerse: {
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
}, {
  timestamps: true
});

export default mongoose.model("monothesimBlogs" , monothesimBlogsSchema)