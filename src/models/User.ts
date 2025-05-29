import mongoose, { Schema, Document, Model } from "mongoose";

// 1️⃣ Define the TypeScript interface for User
export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  income?: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2️⃣ Create the schema
const userSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String },
    income: { type: Number, default: 0 }, // If you want income tracking
  },
  { timestamps: true }
);

// 3️⃣ Export the model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
