import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const res = await fetch(`https://ialosbifes.com.ar/api/demo/${slug}`, {
    cache: "no-store",
  });

  // The web API now returns text/html directly
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    const html = await res.text();
    return new Response(html, {
      status: res.status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Fallback: 404
  return new Response("<h1 style='font-family:sans-serif;color:#fff;background:#0a0a0a;padding:40px'>Demo no encontrada</h1>", {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
