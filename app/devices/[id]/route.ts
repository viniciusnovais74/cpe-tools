import { getAllParameters, setUrlConnection, soap } from "@/envelop/soap";
import connectDB from "@/lib/mongodb";
import {
  extractParameters,
  findValueByPath,
  sanitizeSoapData,
} from "@/lib/sanitizer";
import cpe from "@/models/cpe";
import event from "@/models/event";
import { NextRequest } from "next/server";
import fs from "fs";
import { parseStringPromise } from "xml2js";
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
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const body = await request.text();
    const match = body.match(/<cwmp:ID[^>]*>(.*?)<\/cwmp:ID>/);
    const cwmpID = match ? match[1] : "0"; // Se não encontrar, usa "0"
    if (!body.trim()) {
      const eventd = await event
        .findOne({
          referId: id,
        })
        .sort({ _id: -1 });
      const func = soapFunctions[eventd.envelopeTemplate];
      return new Response(func(cwmpID), {
        status: 200,
        headers: { "Content-Type": "text/xml" },
      });
    }
    const sanitizedData = await sanitizeSoapData(body);
    const informData = sanitizedData.Envelope?.Body?.Inform;
    if (informData) {
      const cpeData = {
        serialNumber: informData.DeviceId?.SerialNumber || "Desconhecido",
        hardwareVersion:
          findValueByPath(
            sanitizedData,
            "InternetGatewayDevice.DeviceInfo.HardwareVersion"
          )._ || "Desconhecido",
        softwareVersion:
          findValueByPath(
            sanitizedData,
            "InternetGatewayDevice.DeviceInfo.SoftwareVersion"
          )._ || "Desconhecido",
        event: informData.Event?.EventCode || "Nenhum evento",
      };
      const existingCpe = await cpe.findOne({
        _id: id,
      });

      if (existingCpe) {
        await cpe.updateOne(
          { _id: id },
          {
            ...cpeData,
            lastUpdated: new Date(),
          }
        );
        console.log("🔄 CPE Atualizada:", cpeData);
      }
    }

    if (sanitizedData.Envelope?.Body?.GetParameterValuesResponse) {
      const result = await parseStringPromise(body);
    
      const paramList =
        result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
          "cwmp:GetParameterValuesResponse"
        ][0]["ParameterList"][0]["ParameterValueStruct"];


      const paramArray = Array.isArray(paramList) ? paramList : [paramList];
      const parametros = paramArray.map((param) => ({
        chave: param.Name[0],
        valor: param.Value[0]?._ || "",
      }));


      await cpe.findOneAndUpdate(
        {
          _id: id,
        },
        { parametros }
      );
    }
    return new Response(soap(cwmpID), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Error" }, { status: 500 });
  }
}

// const sanitizedData = await sanitizeSoapData(body);
// const informData = sanitizedData.Envelope?.Body?.Inform;
// if (informData) {
//   const cpeData = {
//     serialNumber: informData.DeviceId?.SerialNumber || "Desconhecido",
//     hardwareVersion:
//       findValueByPath(
//         sanitizedData,
//         "InternetGatewayDevice.DeviceInfo.HardwareVersion"
//       )._ || "Desconhecido",
//     softwareVersion:
//       findValueByPath(
//         sanitizedData,
//         "InternetGatewayDevice.DeviceInfo.SoftwareVersion"
//       )._ || "Desconhecido",
//     event: informData.Event?.EventCode || "Nenhum evento",
//   };
//   const existingCpe = await CPE.findOne({
//     serialNumber: cpeData.serialNumber,
//   });
//   if (existingCpe) {
//     // Se já existir, apenas atualiza os dados mais recentes
//     await CPE.updateOne(
//       { serialNumber: cpeData.serialNumber },
//       {
//         ...cpeData,
//         lastUpdated: new Date(),
//       }
//     );
//     // console.log("🔄 CPE Atualizada:", cpeData);
//   } else {
//     // Se não existir, cria um novo registro
//     await CPE.create(cpeData);
//     // console.log("✅ Nova CPE salva:", cpeData);
//   }
//   return new Response(soap(cwmpID), {
//     status: 200,
//     headers: { "Content-Type": "text/xml" },
//   });
// }
