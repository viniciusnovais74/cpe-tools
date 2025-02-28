import connectDB from "@/lib/mongodb";
import cpe from  "../../models/cpe";

export async function GET() {
  await connectDB();

  try {
    const cpes = await cpe.find().sort({ lastUpdated: -1 });
    return Response.json({ sucess: true, data: cpes }, { status: 200 });
  } catch (error) {
    console.error("❌ Erro ao buscar CPEs:", error);
    return Response.json({ error: "Erro ao buscar CPEs" }, { status: 500 });
  }
}
