import { notFound } from "next/navigation";

const API_BASE = "https://ialosbifes.com.ar";

interface DemoData {
  slug: string;
  businessName: string;
  businessType: string;
  tagline: string;
  description: string;
  services: string[];
  hours: string;
  priceRange: string;
  emoji: string;
  address: string;
  phone: string;
  whatsappPhone: string;
  primaryColor: string;
  accentColor: string;
  rating: number;
  reviews: number;
}

async function getDemo(slug: string): Promise<DemoData | null> {
  try {
    const res = await fetch(`${API_BASE}/api/demo/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-lg">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      {"☆".repeat(5 - Math.floor(rating) - (rating % 1 >= 0.5 ? 1 : 0))}
    </span>
  );
}

export default async function AutoDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getDemo(slug);
  if (!site) notFound();

  const { primaryColor, accentColor } = site;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-[65vh] flex flex-col items-center justify-end text-center px-6 pb-12 overflow-hidden"
        style={{ background: `linear-gradient(135deg, #111 0%, ${primaryColor}55 100%)` }}
      >
        {/* Top color bar */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accentColor }} />

        {/* AI badge */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/60 border border-white/10">
          ✨ Demo generada con IA
        </div>

        <div className="relative z-10 w-full max-w-sm mx-auto">
          <p className="text-6xl mb-4 drop-shadow-lg">{site.emoji}</p>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">{site.businessName}</h1>
          <p className="text-white/70 text-base mb-5">{site.tagline}</p>

          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 mb-7">
            <Stars rating={site.rating} />
            <span className="font-bold">{site.rating}</span>
            <span className="text-white/60 text-sm">({site.reviews} reseñas)</span>
          </div>

          <div className="flex flex-col gap-3">
            {site.whatsappPhone && (
              <a
                href={`https://wa.me/${site.whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-bold py-4 rounded-2xl text-white text-base shadow-lg transition-all active:scale-95"
                style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.35)" }}
              >
                <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Escribinos por WhatsApp
              </a>
            )}
            {site.phone && (
              <a
                href={`tel:${site.phone}`}
                className="flex items-center justify-center gap-2 font-semibold py-4 rounded-2xl text-base transition-all active:scale-95 border-2"
                style={{ borderColor: accentColor, color: accentColor, background: `${accentColor}15` }}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamanos
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section className="px-6 py-8 max-w-lg mx-auto">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full inline-block" style={{ background: accentColor }} />
          Sobre nosotros
        </h2>
        <p className="text-gray-400 leading-relaxed text-sm">{site.description}</p>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="px-6 py-6 max-w-lg mx-auto">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full inline-block" style={{ background: accentColor }} />
          Qué ofrecemos
        </h2>
        <div className="flex flex-wrap gap-2">
          {site.services.map((s) => (
            <span
              key={s}
              className="text-sm px-4 py-2 rounded-full font-medium"
              style={{
                background: `${primaryColor}40`,
                color: accentColor,
                border: `1px solid ${primaryColor}80`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Info card ────────────────────────────────────────── */}
      <section className="px-6 py-6 max-w-lg mx-auto">
        <div className="bg-gray-900/80 rounded-2xl border border-gray-800 divide-y divide-gray-800/60 overflow-hidden">
          {site.address && (
            <div className="flex items-center gap-4 px-5 py-4">
              <span className="text-2xl shrink-0">📍</span>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Dirección</p>
                <p className="text-sm text-white">{site.address}</p>
              </div>
            </div>
          )}
          {site.hours && (
            <div className="flex items-center gap-4 px-5 py-4">
              <span className="text-2xl shrink-0">🕐</span>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Horario</p>
                <p className="text-sm text-white">{site.hours}</p>
              </div>
            </div>
          )}
          {site.phone && (
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-800/60 transition-colors"
            >
              <span className="text-2xl shrink-0">📞</span>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Teléfono</p>
                <p className="text-sm font-medium" style={{ color: accentColor }}>{site.phone}</p>
              </div>
            </a>
          )}
          {site.priceRange && (
            <div className="flex items-center gap-4 px-5 py-4">
              <span className="text-2xl shrink-0">💰</span>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Precio aprox.</p>
                <p className="text-sm text-white">{site.priceRange}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────── */}
      {site.whatsappPhone && (
        <section className="px-6 py-6 max-w-lg mx-auto">
          <a
            href={`https://wa.me/${site.whatsappPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-bold text-white text-base transition-all active:scale-95 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            }}
          >
            Contactar ahora
          </a>
        </section>
      )}

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="text-center py-10 px-4 mt-4 border-t border-white/5">
        <p className="text-gray-600 text-xs mb-1">
          Demo generada por{" "}
          <a
            href="https://ialosbifes.com.ar"
            className="text-gray-400 hover:text-white transition-colors font-medium"
          >
            IA los Bifes
          </a>
        </p>
        <p className="text-gray-700 text-xs">
          ¿Querés un sitio así para tu negocio?{" "}
          <a
            href="https://ialosbifes.com.ar#contacto"
            className="underline hover:text-gray-400 transition-colors"
          >
            Hablanos
          </a>
        </p>
      </footer>
    </div>
  );
}
