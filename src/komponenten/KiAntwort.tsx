import { useEffect, useState } from 'react';
import FehlerMeldung from './FehlerMeldung.tsx';
import Ladeanimation from './Ladeanimation.tsx';

interface KiAntwortProps {
  antwort: string;
  isStreaming: boolean;
  fehler: string | null;
  hinweis: string | null;
  onAbbrechen: () => void;
  onErneutVersuchen?: () => void;
  ladeText?: string; // Text, bis das erste Wort der KI eintrifft
}

// Zeigt eine gestreamte KI-Antwort samt Ladezustand, Fehler, Hinweis, Abbrechen und Kopieren
function KiAntwort({
  antwort,
  isStreaming,
  fehler,
  hinweis,
  onAbbrechen,
  onErneutVersuchen,
  ladeText = 'Die KI denkt nach …',
}: KiAntwortProps): React.JSX.Element | null {
  const [isKopiert, setIsKopiert] = useState<boolean>(false);

  // "Kopiert ✓" nach 2 Sekunden zurücksetzen; der Timer wird beim Verlassen der Seite aufgeräumt
  useEffect(() => {
    if (!isKopiert) {
      return;
    }
    const timer = setTimeout(() => setIsKopiert(false), 2000);
    return () => clearTimeout(timer);
  }, [isKopiert]);

  // Noch nichts angefragt: nichts anzeigen
  if (antwort === '' && !isStreaming && fehler === null && hinweis === null) {
    return null;
  }

  const handleKopieren = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(antwort);
      setIsKopiert(true);
    } catch {
      setIsKopiert(false); // Zwischenablage nicht verfügbar (z. B. fehlende Berechtigung)
    }
  };

  return (
    <section className="ki-antwort" aria-label="Antwort der KI">
      {/* Transparenz: Inhalte der KI sind klar gekennzeichnet */}
      <p className="ki-kennzeichnung">KI-generierter Inhalt · kann Fehler enthalten</p>

      {fehler !== null && <FehlerMeldung nachricht={fehler} onErneutVersuchen={onErneutVersuchen} />}

      {/* Bis das erste Wort eintrifft, eine Ladeanzeige statt eines leeren Kastens */}
      {isStreaming && antwort === '' && <Ladeanimation text={ladeText} />}

      {antwort !== '' && (
        // aria-busy: Screenreader lesen erst vor, wenn die Antwort vollständig ist
        <p className="ki-text" aria-live="polite" aria-busy={isStreaming}>
          {antwort}
          {isStreaming && <span className="ki-cursor" aria-hidden="true" />}
        </p>
      )}

      {hinweis !== null && <p className="ki-hinweis">{hinweis}</p>}

      <p className="ki-aktionen">
        {isStreaming && (
          <button type="button" onClick={onAbbrechen}>
            Abbrechen
          </button>
        )}
        {!isStreaming && antwort !== '' && (
          <button type="button" onClick={handleKopieren}>
            {isKopiert ? 'Kopiert ✓' : 'Text kopieren'}
          </button>
        )}
      </p>
    </section>
  );
}

export default KiAntwort;
