import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { connectToDatabase } from "~/lib/mongo";
import Vault from "~/models/vault.model";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Params) {
  try {
    const id = (await params).id; //task id

    const result = await Vault.findById(id)
    console.log("Vault: ", result)
    return NextResponse.json(
      { status: "succes", data: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "DB Connection Failed" },
      { status: 500 }
    );
  }
}
