import mongoose, { Schema, Document, Model } from "mongoose";

// 1️⃣ Define the TypeScript interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string | null;
  income?: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2️⃣ Create the schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, default: "New User" }, // Or remove required if you prefer
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: false },
    income: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 3️⃣ Export the model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
