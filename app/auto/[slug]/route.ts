import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const res = await fetch(`https://ialosbifes.com.ar/api/demo/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return new Response("<h1>Demo no encontrada</h1>", {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const data = await res.json();

  // If Claude generated full HTML, serve it directly
  if (data.html) {
    return new Response(data.html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Fallback: render a basic page with the available data
  const { businessName = "Tu negocio", tagline = "", description = "", phone = "", address = "", rating = 5, reviews = 0, primaryColor = "#F59E0B", accentColor = "#F59E0B", whatsappPhone = "" } = data;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${businessName} — Demo por IA los Bifes</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #0a0a0a; color: #fff; min-height: 100vh; }
    .hero { background: linear-gradient(135deg, ${primaryColor}22, #0a0a0a); padding: 80px 24px; text-align: center; border-bottom: 1px solid ${primaryColor}30; }
    .hero h1 { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 900; margin-bottom: 16px; }
    .hero p { color: #aaa; font-size: 1.1rem; max-width: 560px; margin: 0 auto 32px; line-height: 1.6; }
    .badge { display: inline-block; background: ${primaryColor}22; border: 1px solid ${primaryColor}44; color: ${accentColor}; padding: 6px 16px; border-radius: 999px; font-size: 0.85rem; margin-bottom: 20px; }
    .cta { display: inline-block; background: ${primaryColor}; color: #000; font-weight: 700; padding: 16px 32px; border-radius: 16px; text-decoration: none; font-size: 1rem; margin: 8px; }
    .info { max-width: 600px; margin: 48px auto; padding: 0 24px; }
    .info-card { background: #141414; border: 1px solid #222; border-radius: 16px; padding: 24px; margin-bottom: 16px; }
    .info-card p { color: #aaa; font-size: 0.95rem; margin-top: 6px; }
    .stars { color: ${accentColor}; font-size: 1.1rem; }
    .footer { text-align: center; padding: 40px 24px; border-top: 1px solid #1a1a1a; color: #555; font-size: 0.8rem; }
    .footer a { color: ${accentColor}; text-decoration: none; }
  </style>
</head>
<body>
  <div class="hero">
    <div class="badge">✨ Demo creada con IA los Bifes</div>
    <h1>${businessName}</h1>
    ${tagline ? `<p style="color:${accentColor};font-weight:600;margin-bottom:12px">${tagline}</p>` : ""}
    <p>${description}</p>
    ${whatsappPhone ? `<a class="cta" href="https://wa.me/54${whatsappPhone}">💬 Contactar por WhatsApp</a>` : ""}
  </div>
  <div class="info">
    ${rating ? `<div class="info-card"><strong>⭐ Reputación</strong><p class="stars">${"★".repeat(Math.round(rating))}${"☆".repeat(5 - Math.round(rating))} ${rating}/5 · ${reviews} reseñas en Google</p></div>` : ""}
    ${address ? `<div class="info-card"><strong>📍 Ubicación</strong><p>${address}</p></div>` : ""}
    ${phone ? `<div class="info-card"><strong>📞 Teléfono</strong><p>${phone}</p></div>` : ""}
  </div>
  <div class="footer">
    Sitio demo creado por <a href="https://ialosbifes.com.ar">IA los Bifes</a> · Querés el tuyo? <a href="https://ialosbifes.com.ar">Hablemos</a>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
