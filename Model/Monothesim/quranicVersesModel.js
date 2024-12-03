import mongoose from "mongoose";

const quranicVersesSchema = new mongoose.Schema({
  surah: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  NumberOfVerse: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("QuranicVerses" , quranicVersesSchema)