import EnvelopeQueue from "@/lib/EnvelopeQueue";

export async function POST(request: Request) {
  const body = await request.text();
  try {
    const xml = await new EnvelopeQueue(body).init();
    return new Response(xml, {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    return new Response(`Error: ${error}`,{
      status:500
    })
  }
}
