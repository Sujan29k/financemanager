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

  const { title, amount, category } = await req.json();

  await connectDB();
  const newExpense = new Expense({
    title,
    amount,
    category,
    userId: session.user.id, // ✅ Use id, not email
  });

  await newExpense.save();

  return NextResponse.json(newExpense);
}
