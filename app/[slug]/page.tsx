import { getSite } from "@/lib/sites";
import { getPlacePhotos, getPlaceReviews, photoUrl } from "@/lib/places";
import { notFound } from "next/navigation";
import CodeGate from "../CodeGate";


function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "text-sm" : "text-lg";
  return (
    <span className={`${cls} text-amber-400`}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      {"☆".repeat(5 - Math.floor(rating) - (rating % 1 >= 0.5 ? 1 : 0))}
    </span>
  );
}

export default async function LandingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ code?: string }>;
}) {
  const { slug } = await params;
  const { code } = await searchParams;
  const site = getSite(slug);
  if (!site) notFound();

  if (code !== site.code) {
    return <CodeGate redirectPath={`/${site.slug}?code=${site.code}`} />;
  }

  const [photos, reviews] = await Promise.all([
    getPlacePhotos(site.googlePlaceId),
    getPlaceReviews(site.googlePlaceId),
  ]);

  const heroBg = photos[0] ? photoUrl(photos[0].photoReference, 1200) : null;
  const galleryPhotos = photos.slice(1, 5);

  const { primaryColor, accentColor } = site;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-end text-center px-6 pb-12 overflow-hidden">
        {/* Background photo */}
        {heroBg ? (
          <>
            <img src={heroBg} alt={site.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0a0a0a]" />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #111 0%, ${primaryColor}44 100%)` }} />
        )}

        {/* Top color bar */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accentColor }} />

        {/* Content */}
        <div className="relative z-10 w-full max-w-sm mx-auto">
          <p className="text-5xl mb-3 drop-shadow-lg">{site.emoji}</p>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 drop-shadow-lg">{site.name}</h1>
          <p className="text-white/70 text-base mb-5 drop-shadow">{site.tagline}</p>

          {/* Rating */}
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 mb-7">
            <Stars rating={site.rating} />
            <span className="font-bold">{site.rating}</span>
            <span className="text-white/60 text-sm">({site.reviews} en Google)</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/${site.whatsappPhone}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-bold py-4 rounded-2xl text-white text-base shadow-lg transition-all active:scale-95"
              style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.35)" }}
            >
              <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Escribinos por WhatsApp
            </a>
            <a
              href={`https://maps.google.com/?cid=${site.mapsCid}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-semibold py-4 rounded-2xl text-base transition-all active:scale-95 border-2"
              style={{ borderColor: accentColor, color: accentColor, background: `${accentColor}15` }}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Cómo llegar
            </a>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────── */}
      {galleryPhotos.length > 0 && (
        <section className="px-4 py-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {galleryPhotos.map((p, i) => (
              <div key={i} className="relative w-52 h-36 shrink-0 rounded-2xl overflow-hidden snap-start">
                <img src={photoUrl(p.photoReference, 400)} alt={`${site.name} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── About ────────────────────────────────────────────────── */}
      <section className="px-6 py-8 max-w-lg mx-auto">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full inline-block" style={{ background: accentColor }} />
          Sobre nosotros
        </h2>
        <p className="text-gray-400 leading-relaxed text-sm">{site.description}</p>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      <section className="px-6 py-6 max-w-lg mx-auto">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full inline-block" style={{ background: accentColor }} />
          Qué ofrecemos
        </h2>
        <div className="flex flex-wrap gap-2">
          {site.services.map((s) => (
            <span key={s} className="text-sm px-4 py-2 rounded-full font-medium"
              style={{ background: `${primaryColor}40`, color: accentColor, border: `1px solid ${primaryColor}80` }}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Info card ────────────────────────────────────────────── */}
      <section className="px-6 py-6 max-w-lg mx-auto">
        <div className="bg-gray-900/80 rounded-2xl border border-gray-800 divide-y divide-gray-800/60 overflow-hidden">
          <div className="flex items-center gap-4 px-5 py-4">
            <span className="text-2xl shrink-0">📍</span>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Dirección</p>
              <p className="text-sm text-white">{site.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-5 py-4">
            <span className="text-2xl shrink-0">🕐</span>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Horario</p>
              <p className="text-sm text-white">{site.hours}</p>
            </div>
          </div>
          <a href={`tel:+54${site.phone}`} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-800/60 transition-colors">
            <span className="text-2xl shrink-0">📞</span>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Teléfono</p>
              <p className="text-sm font-medium" style={{ color: accentColor }}>0{site.phone}</p>
            </div>
          </a>
          <div className="flex items-center gap-4 px-5 py-4">
            <span className="text-2xl shrink-0">💰</span>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Precio promedio</p>
              <p className="text-sm text-white">{site.priceRange} por persona</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      {reviews.length > 0 && (
        <section className="px-6 py-6 max-w-lg mx-auto">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background: accentColor }} />
            Lo que dicen los clientes
          </h2>
          <div className="space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: primaryColor }}>
                    {r.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{r.authorName}</p>
                    <div className="flex items-center gap-1">
                      <Stars rating={r.rating} size="sm" />
                      <span className="text-gray-600 text-xs">· {r.relativeTime}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Maps CTA ─────────────────────────────────────────────── */}
      <section className="px-6 py-6 max-w-lg mx-auto">
        <a href={`https://maps.google.com/?cid=${site.mapsCid}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-bold text-white text-base transition-all active:scale-95 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}>
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          Ver en Google Maps
        </a>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="text-center py-10 px-4 mt-4">
        <p className="text-gray-700 text-xs">Sitio creado por <span className="text-gray-500 font-medium">IA los Bifes</span></p>
      </footer>
    </div>
  );
}
