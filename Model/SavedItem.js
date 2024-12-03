import mongoose from "mongoose";
const savedItemSchema = new mongoose.Schema({
  userId : {
    type:mongoose.Types.ObjectId ,
    required : true,
    ref : "User"
  },
  programId : {
    type:mongoose.Types.ObjectId ,
    required : true,
    ref : "programs"
  }
} , {timestamps : true });

export default mongoose.model("SavedItem" , savedItemSchema);