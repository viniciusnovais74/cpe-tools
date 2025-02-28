import connectDB from "@/lib/mongodb";
import Cpe from "@/models/Cpe";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const data = await Cpe.findById((await params).id);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json("");
  }
}
