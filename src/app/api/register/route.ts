import { connectToDatabase } from "~/lib/mongo";
import User from "~/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log("USER INFO: ", { email, password })
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
