import { connectDB } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    await connectDB();
    const deleted = await Expense.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("API Delete Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}