import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectToDatabase } from "~/lib/mongo";
import Password from "~/models/password.model";
import User from "~/models/user.model";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { decrypt, encrypt } from "~/lib/crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vault, password } = body;

    
    await connectToDatabase();
    
    const session = await getServerSession(authOptions);
    
    console.log("VAULT AND PASS: ", {  vault, password, user: session?.user?.id})

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

    const pass = await Password.findOne({
      user: session.user.id,
      vault,
      _id: password,
    });

    console.log("PASS: ", pass)

    if (!pass) {
      return NextResponse.json(
        {
          status: "error",
          message: "Password not found!",
        },
        {
          status: 404,
        }
      );
    }

    const decrypted = decrypt({
      iv: pass.iv,
      tag: pass.tag,
      encryptedData: pass.encryptedPassword
    });

    console.log("encryptedData :", decrypted);

    return NextResponse.json(
      {
        status: "success",
        data: {
          password: decrypted,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Error" },
      { status: 500 }
    );
  }
}
