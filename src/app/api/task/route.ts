import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectToDatabase } from "~/lib/mongo";
import { Task as TaskType } from "~/lib/types/task";
import Task from "~/models/task.model";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "~/models/user.model";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);

    if (!session || !session?.user.id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const results = await Task.find({ user: session.user.id });

    return NextResponse.json(
      { status: "success", data: results },
      { status: 200 }
    );
  } catch (error) {
    console.log("GET ALL TASKS ERROR: ", error);
    return NextResponse.json(
      { status: "error", message: "Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name } = body;

    await connectToDatabase();

    const session = await getServerSession(authOptions);

    console.log("SESSION : ", session);

    const user = await User.findById(session?.user.id);

    console.log("USER BULUNDU: ", user);

    if (user) {
      const newTask = {
        name,
        isComplete: false,
        user: user.id,
      };

      const result = await Task.insertOne(newTask);

      console.log("RESULT: ", result);

      return new Response(JSON.stringify(result), { status: 200 });
    }

    return NextResponse.json({ status: "error", message: "User not found!" });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error });
  }
}
