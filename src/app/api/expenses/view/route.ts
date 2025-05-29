// src/app/api/expense/view/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const expenses = await Expense.find({ userId: session.user.id }); // ✅ Filter by userId

  return NextResponse.json(expenses);
}
