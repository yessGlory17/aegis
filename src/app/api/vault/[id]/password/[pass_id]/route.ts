import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectToDatabase } from "~/lib/mongo";
import Password from "~/models/password.model";
import User from "~/models/user.model";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { encrypt } from "~/lib/crypto";

type Params = {
  params: Promise<{ id: string; pass_id: string }>;
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { id, pass_id } = await params;

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

    const password = await Password.findOne({
      user: session.user.id,
      vault: id,
      _id: pass_id,
    });

    if (!password) {
      return NextResponse.json({
        status: "error",
        message: "Password not found!",
      });
    }

    console.log("PASSWORDS :", password);

    return NextResponse.json(
      { status: "success", data: password },
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
