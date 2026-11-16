import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type ProxyOptions } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Lädt alle Variablen aus .env, auch ohne VITE_-Präfix.
  // Sie sind nur hier im Vite-Server (Node.js) verfügbar und gelangen nicht in den Browser-Code.
  const umgebung = loadEnv(mode, process.cwd(), '');
  const modell = umgebung.GEMINI_MODELL || 'gemini-3.5-flash';

  // Proxy für die KI: Der Browser sendet an /api/ki, der Vite-Server leitet an Google Gemini weiter
  // und hängt dabei den API-Schlüssel an. Antworten werden als Stream (Server-Sent Events) geliefert.
  const kiProxy: Record<string, ProxyOptions> = {
    '/api/ki': {
      target: 'https://generativelanguage.googleapis.com',
      changeOrigin: true,
      rewrite: () => `/v1beta/models/${modell}:streamGenerateContent?alt=sse`,
      headers: { 'x-goog-api-key': umgebung.GEMINI_API_KEY ?? '' },
    },
  };

  return {
    plugins: [react()],
    server: { proxy: kiProxy }, // npm run dev
    preview: { proxy: kiProxy }, // npm run preview
  };
});
