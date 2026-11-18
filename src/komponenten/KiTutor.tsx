import { useState } from 'react';
import useKI from '../hooks/useKI.ts';
import type { Artikel } from '../typen/artikel.ts';
import type { GeminiEinstellungen } from '../typen/ki.ts';
import type { TutorNiveau } from '../typen/tutor.ts';
import { erstelleErklaerPrompt, NIVEAUS, TUTOR_SYSTEM_PROMPT } from '../utils/tutor.ts';
import KiAntwort from './KiAntwort.tsx';

interface KiTutorProps {
  artikel: Artikel;
  wikipediaText: string | null; // Einleitung aus der Wikipedia, null solange nicht geladen
}

// Außerhalb der Komponente, damit das Objekt stabil bleibt (Abhängigkeit von useCallback in useKI)
const TUTOR_EINSTELLUNGEN: GeminiEinstellungen = {
  temperature: 0.5,
  thinkingConfig: { thinkingLevel: 'low' },
};

// KI-Tutor: erklärt den Artikel auf einem wählbaren Niveau, Antwort wird gestreamt
function KiTutor({ artikel, wikipediaText }: KiTutorProps): React.JSX.Element {
  const [niveau, setNiveau] = useState<TutorNiveau>('einsteiger');
  const ki = useKI({ systemPrompt: TUTOR_SYSTEM_PROMPT, einstellungen: TUTOR_EINSTELLUNGEN });

  const erklaeren = (): void => {
    void ki.frageStellen(erstelleErklaerPrompt(artikel, wikipediaText, niveau));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    erklaeren();
  };

  return (
    <section className="karte ki-tutor" aria-labelledby="tutor-titel">
      <h2 id="tutor-titel">KI-Tutor</h2>
      <p>
        Lass dir „{artikel.titel}“ von der KI erklären. Grundlage sind der Wiki-Artikel und der
        Wikipedia-Eintrag.
      </p>

      <form onSubmit={handleSubmit}>
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
            {ki.isStreaming ? 'Die KI erklärt …' : 'Erklären lassen'}
          </button>
        </p>
      </form>

      <KiAntwort
        antwort={ki.antwort}
        isStreaming={ki.isStreaming}
        fehler={ki.fehler}
        hinweis={ki.hinweis}
        onAbbrechen={ki.abbrechen}
        onErneutVersuchen={erklaeren}
      />
    </section>
  );
}

export default KiTutor;
