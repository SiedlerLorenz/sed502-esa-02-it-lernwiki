import { useCallback, useEffect, useRef, useState } from 'react';
import type { GeminiEinstellungen } from '../typen/ki.ts';
import { beschreibeAbbruchgrund } from '../utils/kiFehler.ts';
import { streameKiAntwort } from '../utils/kiStream.ts';

interface UseKIOptionen {
  systemPrompt: string; // Rolle und Regeln für die KI
  einstellungen?: GeminiEinstellungen;
}

interface UseKIErgebnis {
  antwort: string; // bisher empfangener Text, wächst während des Streamings
  isStreaming: boolean; // die KI schreibt gerade
  fehler: string | null;
  hinweis: string | null; // z. B. "Antwort wurde gekürzt" oder "abgebrochen"
  frageStellen: (frage: string) => Promise<void>;
  abbrechen: () => void;
  zuruecksetzen: () => void;
}

// Wiederverwendbarer Hook für KI-Anfragen mit gestreamter Antwort
function useKI({ systemPrompt, einstellungen }: UseKIOptionen): UseKIErgebnis {
  const [antwort, setAntwort] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [hinweis, setHinweis] = useState<string | null>(null);

  // useRef merkt sich den AbortController der laufenden Anfrage, ohne neu zu rendern
  const controllerRef = useRef<AbortController | null>(null);

  const frageStellen = useCallback(
    async (frage: string): Promise<void> => {
      if (frage.trim() === '') {
        return;
      }

      // Eine eventuell noch laufende Anfrage beenden, bevor eine neue startet
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setAntwort('');
      setFehler(null);
      setHinweis(null);
      setIsStreaming(true);

      try {
        const grund = await streameKiAntwort(
          {
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: frage }] }],
            generationConfig: einstellungen,
          },
          // Funktionales Update: jeder Textteil wird an den aktuellen Stand angehängt
          (teil) => setAntwort((bisher) => bisher + teil),
          controller.signal,
        );
        setHinweis(beschreibeAbbruchgrund(grund));
      } catch (err) {
        // Wurde inzwischen eine neuere Anfrage gestartet, ist diese hier nicht mehr relevant
        if (controllerRef.current !== controller) {
          return;
        }
        if (err instanceof DOMException && err.name === 'AbortError') {
          setHinweis('Die Antwort wurde abgebrochen.');
        } else {
          setFehler(err instanceof Error ? err.message : 'Unbekannter Fehler bei der KI-Anfrage.');
        }
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null;
          setIsStreaming(false);
        }
      }
    },
    [systemPrompt, einstellungen],
  );

  const abbrechen = useCallback((): void => {
    controllerRef.current?.abort();
  }, []);

  const zuruecksetzen = useCallback((): void => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setAntwort('');
    setFehler(null);
    setHinweis(null);
    setIsStreaming(false);
  }, []);

  // Cleanup: Verlässt man die Seite, wird eine laufende Anfrage abgebrochen
  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return { antwort, isStreaming, fehler, hinweis, frageStellen, abbrechen, zuruecksetzen };
}

export default useKI;
