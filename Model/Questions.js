import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({
  question: {
    type: String ,
  }
});

export default mongoose.model("Question" , QuestionsSchema)