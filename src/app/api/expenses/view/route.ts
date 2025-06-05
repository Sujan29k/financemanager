import { NextRequest, NextResponse } from "next/server";
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
    const sortField = searchParams.get("sort") || "createdAt"; // default sorting
    const sortOrder = searchParams.get("order") === "asc" ? 1 : -1;

    const query: any = { userId: token.id };
    if (category && category !== "All") {
      query.category = category;
    }

    const expenses = await Expense.find(query).sort({ [sortField]: sortOrder });

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
