import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["reminder", "alert", "info", "custom"],
    default: "custom",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
