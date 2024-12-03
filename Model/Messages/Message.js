import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "User"
    },
    message: [
      {
          message: { type: String, required: true },
          isAdmin: { type: Boolean, required: true },
          time : { type : Date, default : Date.now() }
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
