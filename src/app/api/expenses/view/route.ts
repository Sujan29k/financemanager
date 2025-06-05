// src/app/api/expense/view/route.ts

import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query: any = { userId: token.id };
    if (category) query.category = category;

    const expenses = await Expense.find(query).sort({ createdAt: -1 });

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
