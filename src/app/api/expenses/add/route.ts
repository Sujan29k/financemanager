import { connectDB } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, amount, category, date } = await req.json();

    if (!title || !amount || !category || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const newExpense = new Expense({
      title,
      amount,
      category,
      date: new Date(date), // convert to Date object
      userId: token.id,
    });

    await newExpense.save();

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error: any) {
    console.error("Error adding expense:", error?.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
