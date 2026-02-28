import { sites } from "@/lib/sites";
import CodeGate from "./CodeGate";
import Link from "next/link";

const CATEGORY_EMOJI: Record<string, string> = {
  cafe: "☕", gym: "💪", peluqueria: "✂️", ropa: "👗",
  restaurant: "🍽️", farmacia: "💊", taller: "🔧", otro: "🏪",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  if (code !== "ialosbifes") {
    return <CodeGate redirectPath="/?code=ialosbifes" />;
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-5xl mb-3">🥩</p>
          <h1 className="text-white text-3xl font-bold">IA los Bifes</h1>
          <p className="text-gray-500 mt-1">Panel de demos — {sites.length} cliente{sites.length !== 1 ? "s" : ""}</p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {sites.map((site) => (
            <Link
              key={site.slug}
              href={`/${site.slug}?code=${site.code}`}
              className="group bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-5 transition-all hover:bg-gray-800/80"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{CATEGORY_EMOJI[site.category] || "🏪"}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold truncate group-hover:text-amber-400 transition-colors">
                    {site.name}
                  </h2>
                  <p className="text-gray-500 text-sm truncate">{site.tagline}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full font-mono">
                      /{site.slug}
                    </span>
                    <span className="text-yellow-400 text-xs">★ {site.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-gray-700 text-xs mt-10">IA los Bifes · ialosbifes.com.ar</p>
      </div>
    </div>
  );
}
