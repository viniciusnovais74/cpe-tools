import soapFunctions, { envelopeContinue, setUrlConnection } from "@/envelop/soap";
import EnvelopeQueue from "@/lib/EnvelopeQueue";
import connectDB from "@/lib/mongodb";
import cpe from "../../../models/cpe";
import event from "@/models/Events";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = (await params).id;

  const command = request.nextUrl.searchParams.get("command");

  try {
    const onu = await cpe.findById(id);
    if (command) {
      await event.create({
        serialNumber: onu.serialNumber,
        envelopeTemplate: command,
        referId: id,
      });
    }

    return Response.json(onu);
  } catch (error) {
    console.log(error);
    return Response.json("OK");
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const body = await request.text();
  const id = (await params).id;
  const match = body.match(/<cwmp:ID[^>]*>(.*?)<\/cwmp:ID>/);
  const cwmpID = match ? match[1] : "0"; // Se não encontrar, usa "0"
  console.log("===>",cwmpID)
  return new Response(envelopeContinue(cwmpID), {
    headers: { "Content-Type": "text/xml" },
  });
}
