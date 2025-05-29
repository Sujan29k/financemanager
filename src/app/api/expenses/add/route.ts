// src/app/api/expense/add/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, amount, category } = await req.json();

    if (!title || !amount || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const newExpense = new Expense({
      title,
      amount,
      category,
      userId: session.user.id,
    });

    await newExpense.save();

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error("Error adding expense:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
