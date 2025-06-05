import mongoose, { Schema } from "mongoose";

const ExpenseSchema = new Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Expense =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
