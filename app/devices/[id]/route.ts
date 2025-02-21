import {
  getAllParameters,
  Reboot,
  setUrlConnection,
  soap,
} from "@/envelop/soap";
import EnvelopCheck from "@/lib/EnvelopCheck";
import connectDB from "@/lib/mongodb";
import cpe from "@/models/cpe";
import event from "@/models/event";
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

const soapFunctions: Record<
  string,
  (cwmpID: string, ...args: any[]) => string
> = {
  soap: soap,
  getAllParameters: getAllParameters,
  setUrlConnection: setUrlConnection,
  Reboot: Reboot,
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.text();
  const id = (await params).id;
  const match = body?.match(/<cwmp:ID[^>]*>(.*?)<\/cwmp:ID>/);
  const cwmpID = match ? match[1] : "0"; // Se não encontrar, usa "0"
  let template: string = (await new EnvelopCheck(body).start(id)) || "soap";

  if (!body.trim() && id) {
    const newTemplate = await new EnvelopCheck().command(id);
    if (newTemplate) template = newTemplate;
  }

  const fun = soapFunctions[template];

  return new Response(template == "NotResponse" ? "" : fun(cwmpID), {
    headers: { "Content-Type": "text/xml" },
  });
}
