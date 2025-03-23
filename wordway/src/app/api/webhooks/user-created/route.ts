import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("Webhook received:", data);

    return new Response(
      JSON.stringify({ success: true, message: "Webhook received" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
