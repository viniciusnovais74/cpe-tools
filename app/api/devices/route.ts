import connectDB from "@/lib/mongodb";
import Cpe from "@/models/Cpe";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const resp = await Cpe.find();
    return NextResponse.json({ sucess: true, list: resp }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
