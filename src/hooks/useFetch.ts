import { useEffect, useState } from 'react';
import { fetchJSON } from '../utils/fetchJSON.ts';

// Was der Hook an die Komponente zurückgibt: die drei Zustände und eine Funktion zum erneuten Laden
interface UseFetchErgebnis<T> {
  daten: T | null; // Erfolg: die geladenen Daten
  isLaden: boolean; // Laden: die Anfrage läuft gerade
  fehler: string | null; // Fehler: verständliche Fehlermeldung
  neuLaden: () => void;
}

// Wiederverwendbarer Hook zum Laden von JSON-Daten
// Ist die URL null, wird nichts geladen (z. B. solange noch kein Suchbegriff eingegeben wurde)
function useFetch<T>(url: string | null): UseFetchErgebnis<T> {
  const [daten, setDaten] = useState<T | null>(null);
  const [isLaden, setIsLaden] = useState<boolean>(url !== null);
  const [fehler, setFehler] = useState<string | null>(null);
  // Wird hochgezählt, um denselben Abruf erneut auszulösen
  const [versuch, setVersuch] = useState<number>(0);

  useEffect(() => {
    // Ohne URL gibt es nichts zu laden (das Ergebnis wird unten direkt abgeleitet)
    if (url === null) {
      return;
    }

    // Verhindert State-Updates, wenn die Komponente inzwischen verschwunden ist
    // oder bereits eine neuere Anfrage gestartet wurde
    let abgebrochen = false;

    const laden = async (): Promise<void> => {
      setIsLaden(true);
      setFehler(null);

      try {
        const ergebnis = await fetchJSON<T>(url);
        if (!abgebrochen) {
          setDaten(ergebnis);
        }
      } catch (err) {
        if (!abgebrochen) {
          setDaten(null);
          setFehler(err instanceof Error ? err.message : 'Unbekannter Fehler beim Laden.');
        }
      } finally {
        if (!abgebrochen) {
          setIsLaden(false);
        }
      }
    };

    laden();

    // Cleanup: läuft, bevor der Effekt erneut startet oder die Komponente entfernt wird
    return () => {
      abgebrochen = true;
    };
  }, [url, versuch]);

  const neuLaden = (): void => {
    setVersuch((bisher) => bisher + 1);
  };

  // Ohne URL: kein Laden, keine Daten, kein Fehler – auch wenn vorher etwas geladen war
  if (url === null) {
    return { daten: null, isLaden: false, fehler: null, neuLaden };
  }

  return { daten, isLaden, fehler, neuLaden };
}

export default useFetch;
