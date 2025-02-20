import connectDB from "@/lib/mongodb";
import { setUrlConnection, soap } from "@/envelop/soap";
import CPE from "@/models/cpe";

function generateRandomText() {
  return Math.random().toString(36).substring(2, 7); // Gera um texto aleatório de 5 caracteres
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.text();
    const match = body.match(/<cwmp:ID[^>]*>(.*?)<\/cwmp:ID>/);
    const cwmpID = match ? match[1] : "0"; // Se não encontrar, usa "0"

    if (!body.trim()) {
      const cpeData = {
        serialNumber: generateRandomText(),
        hardwareVersion: generateRandomText(),
        softwareVersion: generateRandomText(),
        event: generateRandomText(),
      };

      const uid = await CPE.create(cpeData);

      return new Response(
        setUrlConnection(
          cwmpID,
          `${process.env.HOSTNAME}/devices/${uid._id}`
        ),
        {
          status: 200,
          headers: { "Content-Type": "text/xml" },
        }
      );
    }

    return new Response(soap(cwmpID), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });

  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return new Response("Erro interno", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
