import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    content: { type: String, default: "", trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
