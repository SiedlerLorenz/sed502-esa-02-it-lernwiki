import { useState } from 'react';
import useKI from '../hooks/useKI.ts';
import type { Artikel } from '../typen/artikel.ts';
import type { GeminiEinstellungen } from '../typen/ki.ts';
import type { TutorNiveau } from '../typen/tutor.ts';
import {
  erstelleErklaerPrompt,
  erstelleFragePrompt,
  NIVEAUS,
  TUTOR_SYSTEM_PROMPT,
} from '../utils/tutor.ts';
import { pruefeTutorFrage, TUTOR_FRAGE_MAX } from '../utils/validierung.ts';
import KiAntwort from './KiAntwort.tsx';

interface KiTutorProps {
  artikel: Artikel;
  wikipediaText: string | null; // Einleitung aus der Wikipedia, null solange nicht geladen
}

// Die zuletzt gestellte Anfrage: Überschrift für die Anzeige und Prompt für "Erneut versuchen"
interface TutorAnfrage {
  titel: string;
  prompt: string;
}

// Außerhalb der Komponente, damit das Objekt stabil bleibt (Abhängigkeit von useCallback in useKI)
const TUTOR_EINSTELLUNGEN: GeminiEinstellungen = {
  temperature: 0.5,
  thinkingConfig: { thinkingLevel: 'low' },
};

// KI-Tutor: erklärt den Artikel auf einem wählbaren Niveau oder beantwortet eigene Fragen
function KiTutor({ artikel, wikipediaText }: KiTutorProps): React.JSX.Element {
  const [niveau, setNiveau] = useState<TutorNiveau>('einsteiger');
  const [frage, setFrage] = useState<string>('');
  const [frageFehler, setFrageFehler] = useState<string | null>(null);
  const [letzteAnfrage, setLetzteAnfrage] = useState<TutorAnfrage | null>(null);

  const ki = useKI({ systemPrompt: TUTOR_SYSTEM_PROMPT, einstellungen: TUTOR_EINSTELLUNGEN });

  // Gemeinsamer Weg für Erklärung und eigene Frage
  const anfragen = (anfrage: TutorAnfrage): void => {
    setLetzteAnfrage(anfrage);
    void ki.frageStellen(anfrage.prompt);
  };

  const handleErklaeren = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const option = NIVEAUS.find((eintrag) => eintrag.wert === niveau) ?? NIVEAUS[0];
    anfragen({
      titel: `Erklärung: ${option.bezeichnung}`,
      prompt: erstelleErklaerPrompt(artikel, wikipediaText, niveau),
    });
  };

  const handleFrageSenden = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const meldung = pruefeTutorFrage(frage);
    setFrageFehler(meldung);
    if (meldung !== null) {
      return;
    }
    anfragen({
      titel: `Deine Frage: ${frage.trim()}`,
      prompt: erstelleFragePrompt(artikel, wikipediaText, frage),
    });
    setFrage('');
  };

  const handleFrageAendern = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setFrage(event.target.value);
    // Wird bereits ein Fehler angezeigt, verschwindet er, sobald die Eingabe gültig ist
    if (frageFehler !== null) {
      setFrageFehler(pruefeTutorFrage(event.target.value));
    }
  };

  // IDs der Texte, die das Eingabefeld beschreiben (Zeichenzähler und ggf. Fehlermeldung)
  const beschreibungIds = frageFehler !== null ? 'tutor-zaehler tutor-frage-fehler' : 'tutor-zaehler';

  return (
    <section className="karte ki-tutor" aria-labelledby="tutor-titel">
      <h2 id="tutor-titel">KI-Tutor</h2>
      <p>
        Lass dir „{artikel.titel}“ von der KI erklären oder stelle eine eigene Frage. Grundlage sind
        der Wiki-Artikel und der Wikipedia-Eintrag.
      </p>

      <form onSubmit={handleErklaeren}>
        <fieldset className="tutor-niveaus">
          <legend>Wie soll erklärt werden?</legend>
          {NIVEAUS.map((option) => (
            <p key={option.wert} className="tutor-niveau">
              <input
                type="radio"
                id={`niveau-${option.wert}`}
                name="niveau"
                value={option.wert}
                checked={niveau === option.wert}
                onChange={() => setNiveau(option.wert)}
              />
              <label htmlFor={`niveau-${option.wert}`}>
                <strong>{option.bezeichnung}</strong>
                <span className="tutor-niveau-beschreibung">{option.beschreibung}</span>
              </label>
            </p>
          ))}
        </fieldset>
        <p className="ki-aktionen">
          <button type="submit" disabled={ki.isStreaming}>
            Erklären lassen
          </button>
        </p>
      </form>

      <form className="tutor-frage" onSubmit={handleFrageSenden} noValidate>
        <label htmlFor="tutor-frage-feld">Eigene Frage zu diesem Artikel</label>
        <textarea
          id="tutor-frage-feld"
          rows={3}
          maxLength={TUTOR_FRAGE_MAX}
          value={frage}
          onChange={handleFrageAendern}
          placeholder="z. B. Was ist der Unterschied zu …?"
          aria-required="true"
          aria-invalid={frageFehler !== null}
          aria-describedby={beschreibungIds}
        />
        <p id="tutor-zaehler" className="zeichenzaehler">
          {frage.length} / {TUTOR_FRAGE_MAX} Zeichen
        </p>
        {frageFehler !== null && (
          <p id="tutor-frage-fehler" className="feldfehler" role="alert">
            <span aria-hidden="true">⚠ </span>
            {frageFehler}
          </p>
        )}
        <p className="ki-aktionen">
          <button type="submit" disabled={ki.isStreaming}>
            Frage stellen
          </button>
        </p>
      </form>

      {letzteAnfrage !== null && <p className="tutor-anfrage">{letzteAnfrage.titel}</p>}
      <KiAntwort
        antwort={ki.antwort}
        isStreaming={ki.isStreaming}
        fehler={ki.fehler}
        hinweis={ki.hinweis}
        onAbbrechen={ki.abbrechen}
        onErneutVersuchen={letzteAnfrage === null ? undefined : () => anfragen(letzteAnfrage)}
      />
    </section>
  );
}

export default KiTutor;
