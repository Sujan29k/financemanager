import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// POST - Update Income
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { income } = await req.json();
    if (!income || isNaN(income)) {
      return NextResponse.json({ message: "Invalid income" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOneAndUpdate(
      { email: session.user?.email },
      { income: Number(income) },
      { new: true }
    );

    return NextResponse.json({ message: "Income updated", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// GET - Get Income
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const user = await User.findOne({ email: session.user?.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ income: user.income || 0 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
