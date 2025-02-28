// import soapFunctions from "@/envelop/soap";
// import EnvelopeQueue from "@/lib/EnvelopeQueue";
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

  // let template: string = (await new EnvelopeQueue(body).start(id)) || "soap";

  // if (!body.trim() && id) {
  //   const newTemplate = await new EnvelopeQueue().command(id);
  //   if (newTemplate) template = newTemplate;
  // }

  // const fun = soapFunctions[template];
  // template == "NotResponse" ? "" : fun(cwmpID)
  return new Response("", {
    headers: { "Content-Type": "text/xml" },
  });
}
