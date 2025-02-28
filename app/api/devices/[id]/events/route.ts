import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;
    const events = await Events.find({ referId: id });
    return Response.json(events);
  } catch (error) {
    return Response.json(`Error:${error}`, { status: 500 });
  }
}
