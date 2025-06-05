import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = (await User.findOne({
      email: normalizedEmail,
    })) as IUser | null;
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = (await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    })) as IUser;

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Registration error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", detail: error.message },
      { status: 500 }
    );
  }
}
