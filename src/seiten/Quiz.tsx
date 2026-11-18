import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useKI from '../hooks/useKI.ts';
import FehlerMeldung from '../komponenten/FehlerMeldung.tsx';
import Ladeanimation from '../komponenten/Ladeanimation.tsx';
import QuizFrageKarte from '../komponenten/QuizFrageKarte.tsx';
import { artikelListe } from '../daten/artikel.ts';
import type { GeminiEinstellungen } from '../typen/ki.ts';
import type { QuizFrage } from '../typen/quiz.ts';
import { erstelleQuizPrompt, leseQuizFragen, QUIZ_SYSTEM_PROMPT } from '../utils/quiz.ts';

// Außerhalb der Komponente, damit das Objekt bei jedem Rendern dasselbe bleibt (stabil für useCallback in useKI)
const QUIZ_EINSTELLUNGEN: GeminiEinstellungen = {
  temperature: 0.4,
  responseMimeType: 'application/json', // die KI muss gültiges JSON liefern
  thinkingConfig: { thinkingLevel: 'low' }, // wenig Nachdenken: wenige Sekunden statt mehrerer Minuten
};

// Alle Kategorien in der Reihenfolge ihres ersten Vorkommens, ohne Doppelte (für die Gruppierung der Auswahl)
const KATEGORIEN = [...new Set(artikelListe.map((artikel) => artikel.kategorie))];

// Quiz-Seite: Die KI erstellt zu einem ausgewählten Wiki-Artikel Multiple-Choice-Fragen
function Quiz(): React.JSX.Element {
  // Ausgewählter Artikel steht in der URL (?artikel=3), damit die Detailseite direkt hierher verlinken kann
  const [suchParameter, setSuchParameter] = useSearchParams();
  const artikelId = suchParameter.get('artikel') ?? '';
  const artikel = artikelListe.find((eintrag) => String(eintrag.id) === artikelId);

  const [auswahlFehler, setAuswahlFehler] = useState<string | null>(null);
  // Angekreuzte Antworten: pro Frage eine Liste von Antwort-Indizes
  const [auswahlen, setAuswahlen] = useState<number[][]>([]);

  const ki = useKI({ systemPrompt: QUIZ_SYSTEM_PROMPT, einstellungen: QUIZ_EINSTELLUNGEN });

  // Fragen werden aus der fertigen KI-Antwort abgeleitet, nicht in einem eigenen State gespeichert
  let fragen: QuizFrage[] | null = null;
  let quizFehler: string | null = null;
  if (!ki.isStreaming && ki.antwort !== '' && ki.hinweis === null) {
    try {
      fragen = leseQuizFragen(ki.antwort);
    } catch (err) {
      quizFehler = err instanceof Error ? err.message : 'Die Quizfragen konnten nicht gelesen werden.';
    }
  }

  const handleArtikelWechsel = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSuchParameter(event.target.value === '' ? {} : { artikel: event.target.value });
    setAuswahlFehler(null);
    ki.zuruecksetzen();
    setAuswahlen([]);
  };

  const handleErstellen = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (artikel === undefined) {
      setAuswahlFehler('Bitte zuerst einen Artikel auswählen.');
      return;
    }
    setAuswahlen([]);
    void ki.frageStellen(erstelleQuizPrompt(artikel));
  };

  // Antwort an- oder abwählen; es entsteht immer eine neue Liste (Immutabilität)
  const handleUmschalten = (frageIndex: number, antwortIndex: number): void => {
    setAuswahlen((bisher) => {
      const neu = fragen === null ? [] : fragen.map((_, i) => bisher[i] ?? []);
      const aktuell = neu[frageIndex];
      neu[frageIndex] = aktuell.includes(antwortIndex)
        ? aktuell.filter((index) => index !== antwortIndex)
        : [...aktuell, antwortIndex];
      return neu;
    });
  };

  return (
    <div className="detailseite">
      <section className="karte" aria-labelledby="quiz-titel">
        <h1 id="quiz-titel">Quiz</h1>
        <p>
          Wähle einen Artikel aus dem IT-Lernwiki. Die KI erstellt dazu fünf Fragen mit je fünf
          Antworten. Eine oder mehrere Antworten können richtig sein.
        </p>

        <form className="quiz-formular" onSubmit={handleErstellen} noValidate>
          <label htmlFor="quiz-artikel">Artikel</label>
          <p className="formular-zeile">
            <select
              id="quiz-artikel"
              value={artikel === undefined ? '' : artikelId}
              onChange={handleArtikelWechsel}
              aria-required="true"
              aria-invalid={auswahlFehler !== null}
              aria-describedby={auswahlFehler !== null ? 'quiz-artikel-fehler' : undefined}
            >
              <option value="">Bitte wählen …</option>
              {KATEGORIEN.map((kategorie) => (
                <optgroup key={kategorie} label={kategorie}>
                  {artikelListe
                    .filter((eintrag) => eintrag.kategorie === kategorie)
                    .map((eintrag) => (
                      <option key={eintrag.id} value={eintrag.id}>
                        {eintrag.titel}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
            <button type="submit" disabled={ki.isStreaming}>
              {fragen === null ? 'Quiz erstellen' : 'Neues Quiz erstellen'}
            </button>
          </p>
          {auswahlFehler !== null && (
            <p id="quiz-artikel-fehler" className="feldfehler" role="alert">
              <span aria-hidden="true">⚠ </span>
              {auswahlFehler}
            </p>
          )}
        </form>

        {/* Während die KI das JSON schreibt, wird es nicht angezeigt, sondern nur der Fortschritt */}
        {ki.isStreaming && (
          <>
            <Ladeanimation text="Die KI erstellt die Quizfragen …" />
            <button type="button" onClick={ki.abbrechen}>
              Abbrechen
            </button>
          </>
        )}
        {ki.hinweis !== null && <p className="ki-hinweis">{ki.hinweis}</p>}
        {(ki.fehler ?? quizFehler) !== null && (
          <FehlerMeldung
            nachricht={ki.fehler ?? quizFehler ?? ''}
            onErneutVersuchen={
              artikel === undefined ? undefined : () => void ki.frageStellen(erstelleQuizPrompt(artikel))
            }
          />
        )}
      </section>

      {fragen !== null && artikel !== undefined && (
        <section className="karte" aria-labelledby="fragen-titel">
          <h2 id="fragen-titel">Fragen zu „{artikel.titel}“</h2>
          <p className="ki-kennzeichnung">KI-generierter Inhalt · kann Fehler enthalten</p>
          {fragen.map((frage, frageIndex) => (
            <QuizFrageKarte
              key={`${frageIndex}-${frage.frage}`}
              frage={frage}
              nummer={frageIndex + 1}
              auswahl={auswahlen[frageIndex] ?? []}
              onUmschalten={(antwortIndex) => handleUmschalten(frageIndex, antwortIndex)}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default Quiz;
