import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { connectToDatabase } from "~/lib/mongo";
import Task from "~/models/task.model";

type Params = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = (await params).id; //task id

    await Task.findByIdAndDelete(id)

    return NextResponse.json(
      { status: "succes", message: "Task deleted!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "DB Connection Failed" },
      { status: 500 }
    );
  }
}
