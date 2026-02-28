import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  const w = req.nextUrl.searchParams.get("w") || "800";
  if (!ref) return new NextResponse("Missing ref", { status: 400 });

  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${w}&photo_reference=${ref}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
  const res = await fetch(url);
  const blob = await res.arrayBuffer();

  return new NextResponse(blob, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
