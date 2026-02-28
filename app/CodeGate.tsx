"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CodeGate({ redirectPath }: { redirectPath: string }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const submit = () => {
    const expected = redirectPath.replace("/", "") || "ialosbifes";
    const [path, query] = redirectPath.split("?code=");
    if (code.trim().toLowerCase() === (query || expected)) {
      router.push(`${path}?code=${code.trim().toLowerCase()}`);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-4xl mb-3">🥩</p>
          <h1 className="text-white text-2xl font-bold">IA los Bifes</h1>
          <p className="text-gray-500 text-sm mt-1">Ingresá tu código de acceso</p>
        </div>
        <div className="space-y-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Código..."
            className={`w-full bg-gray-900 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-center text-lg tracking-widest focus:outline-none transition-colors ${
              error ? "border-red-500" : "border-gray-800 focus:border-gray-600"
            }`}
          />
          <button
            onClick={submit}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Ingresar
          </button>
          {error && <p className="text-red-400 text-sm text-center">Código inválido</p>}
        </div>
      </div>
    </div>
  );
}
