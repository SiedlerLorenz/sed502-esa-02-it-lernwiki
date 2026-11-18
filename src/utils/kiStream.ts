import type { GeminiAnfrage, GeminiStreamTeil } from '../typen/ki.ts';
import { erstelleKiFehlertext } from './kiFehler.ts';

// Adresse des Vite-Proxys, der die Anfrage mit API-Schlüssel an Gemini weiterleitet
const KI_ENDPUNKT = '/api/ki/stream';

// Liest aus einer Stream-Zeile ("data: {...}") den Text und den Abbruchgrund
function verarbeiteZeile(zeile: string): { text: string; grund: string | null } {
  if (!zeile.startsWith('data: ')) {
    return { text: '', grund: null }; // Leerzeilen trennen die Ereignisse
  }

  try {
    const teil = JSON.parse(zeile.slice(6)) as GeminiStreamTeil;
    const kandidat = teil.candidates?.[0];
    const text = (kandidat?.content?.parts ?? []).map((p) => p.text ?? '').join('');
    return { text, grund: kandidat?.finishReason ?? null };
  } catch {
    return { text: '', grund: null }; // unlesbare Zeile überspringen
  }
}

// Sendet eine Anfrage an die KI und meldet jeden empfangenen Textteil sofort über onTeil.
// Rückgabe: der Grund, warum die KI aufgehört hat (z. B. "STOP"), oder null.
// Über signal (AbortController) lässt sich die Anfrage jederzeit abbrechen.
export async function streameKiAntwort(
  anfrage: GeminiAnfrage,
  onTeil: (text: string) => void,
  signal?: AbortSignal,
): Promise<string | null> {
  let antwort: Response;

  try {
    antwort = await fetch(KI_ENDPUNKT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(anfrage),
      signal,
    });
  } catch (err) {
    // Ein Abbruch durch die Nutzerin oder den Nutzer wird unverändert weitergereicht
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }
    throw new Error('Keine Verbindung zum KI-Dienst. Bitte die Internetverbindung prüfen.');
  }

  if (!antwort.ok) {
    // Fehlertext von Gemini mitlesen, um z. B. Minuten- und Tageslimit zu unterscheiden
    const details = await antwort.text().catch(() => '');
    throw new Error(erstelleKiFehlertext(antwort.status, details));
  }

  const leser = antwort.body?.getReader();
  if (leser === undefined) {
    throw new Error('Die KI-Antwort konnte nicht gelesen werden.');
  }

  const decoder = new TextDecoder();
  let puffer = ''; // unvollständige Zeile vom Ende des letzten Datenpakets
  let grund: string | null = null;

  while (true) {
    const { done, value } = await leser.read();
    if (done) {
      break;
    }

    // stream: true, damit Umlaute, die auf zwei Pakete verteilt sind, richtig dekodiert werden
    puffer += decoder.decode(value, { stream: true });

    // Nur vollständige Zeilen verarbeiten, der Rest wartet auf das nächste Paket
    const zeilen = puffer.split('\n');
    puffer = zeilen.pop() ?? '';

    for (const zeile of zeilen) {
      const ergebnis = verarbeiteZeile(zeile.trim());
      if (ergebnis.text !== '') {
        onTeil(ergebnis.text);
      }
      grund = ergebnis.grund ?? grund;
    }
  }

  // Letzte Zeile, falls der Stream ohne abschließenden Zeilenumbruch endet
  const letzte = verarbeiteZeile((puffer + decoder.decode()).trim());
  if (letzte.text !== '') {
    onTeil(letzte.text);
  }
  return letzte.grund ?? grund;
}
