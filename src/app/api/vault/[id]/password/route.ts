import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectToDatabase } from "~/lib/mongo";
import Password from "~/models/password.model";
import User from "~/models/user.model";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { encrypt } from "~/lib/crypto";

type Params = {
  params: Promise<{ id: string }>;
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

    const results = await Password.find({ user: session.user.id, vault: id })

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, service, username, password, vault } = body;

    console.log("WORKSAPCE BODY: ", { title, service, username, password });

    await connectToDatabase();

    const session = await getServerSession(authOptions);

    console.log("SESSION : ", session);

    const user = await User.findById(session?.user.id);

    console.log("USER BULUNDU: ", user);

    if (user) {
      const { iv, encryptedData, tag } = encrypt(password);
      const newVault = {
        title,
        service,
        username,
        encryptedPassword: encryptedData,
        iv,
        tag,
        user: session?.user?.id,
        vault,
      };

      console.log("CURRENT PASSWORD: ", newVault);

      const result = await Password.insertOne(newVault);

      console.log("RESULT: ", result);

      return NextResponse.json(
        { status: "success", data: result },
        { status: 200 }
      );
    }

    return NextResponse.json({ status: "error", message: "User not found!" });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error });
  }
}
