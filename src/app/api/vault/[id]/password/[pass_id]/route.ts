import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectToDatabase } from "~/lib/mongo";
import Password from "~/models/password.model";
import User from "~/models/user.model";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { encrypt } from "~/lib/crypto";

type Params = {
  params: Promise<{ id: string; pass_id: string; }>;
};

export async function GET(request: Request, { params }: Params) {
  try {
    const id = (await params).id;

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

    const results = await Password.findOne({ user: session.user.id, vault: id })

    console.log("PASSWORDS :", results);

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