import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    apprived : {
      type : Boolean ,
      default : false
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
