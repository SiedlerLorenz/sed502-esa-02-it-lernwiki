import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useKI from '../hooks/useKI.ts';
import FehlerMeldung from '../komponenten/FehlerMeldung.tsx';
import KiAntwort from '../komponenten/KiAntwort.tsx';
import Ladeanimation from '../komponenten/Ladeanimation.tsx';
import QuizFrageKarte from '../komponenten/QuizFrageKarte.tsx';
import { artikelListe } from '../daten/artikel.ts';
import type { GeminiEinstellungen } from '../typen/ki.ts';
import type { QuizFrage } from '../typen/quiz.ts';
import {
  berechnePunkte,
  ERKLAERUNG_SYSTEM_PROMPT,
  erstelleErklaerungsPrompt,
  erstelleQuizPrompt,
  leseQuizFragen,
  QUIZ_SYSTEM_PROMPT,
} from '../utils/quiz.ts';

// Außerhalb der Komponente, damit die Objekte bei jedem Rendern dieselben bleiben (stabil für useCallback in useKI)
const QUIZ_EINSTELLUNGEN: GeminiEinstellungen = {
  temperature: 0.4,
  responseMimeType: 'application/json', // die KI muss gültiges JSON liefern
  thinkingConfig: { thinkingLevel: 'low' }, // wenig Nachdenken: wenige Sekunden statt mehrerer Minuten
};
const ERKLAERUNG_EINSTELLUNGEN: GeminiEinstellungen = {
  temperature: 0.3,
  thinkingConfig: { thinkingLevel: 'low' },
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
  const [isAusgewertet, setIsAusgewertet] = useState<boolean>(false);
  // Frage, zu der gerade eine Erklärung angezeigt wird
  const [erklaerteFrage, setErklaerteFrage] = useState<number | null>(null);

  // Zwei unabhängige KI-Anfragen: eine erstellt das Quiz, eine erklärt einzelne Fragen
  const ki = useKI({ systemPrompt: QUIZ_SYSTEM_PROMPT, einstellungen: QUIZ_EINSTELLUNGEN });
  const erklaerung = useKI({ systemPrompt: ERKLAERUNG_SYSTEM_PROMPT, einstellungen: ERKLAERUNG_EINSTELLUNGEN });

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

  // Punkte pro Frage, sobald ausgewertet wurde (sonst null)
  const punkteProFrage =
    isAusgewertet && fragen !== null
      ? fragen.map((frage, index) => berechnePunkte(frage, auswahlen[index] ?? []))
      : null;
  const gesamtPunkte = punkteProFrage?.reduce((summe, punkte) => summe + punkte, 0) ?? 0;

  // Antworten, Auswertung und Erklärung zurücksetzen (bei neuem Quiz oder neuem Versuch)
  const antwortenZuruecksetzen = (): void => {
    setAuswahlen([]);
    setIsAusgewertet(false);
    setErklaerteFrage(null);
    erklaerung.zuruecksetzen();
  };

  const handleArtikelWechsel = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSuchParameter(event.target.value === '' ? {} : { artikel: event.target.value });
    setAuswahlFehler(null);
    ki.zuruecksetzen();
    antwortenZuruecksetzen();
  };

  const quizErstellen = (): void => {
    if (artikel === undefined) {
      setAuswahlFehler('Bitte zuerst einen Artikel auswählen.');
      return;
    }
    antwortenZuruecksetzen();
    void ki.frageStellen(erstelleQuizPrompt(artikel));
  };

  const handleErstellen = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    quizErstellen();
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

  const handleAuswerten = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsAusgewertet(true);
  };

  const handleWarum = (frageIndex: number): void => {
    if (fragen === null || artikel === undefined) {
      return;
    }
    setErklaerteFrage(frageIndex);
    void erklaerung.frageStellen(
      erstelleErklaerungsPrompt(artikel, fragen[frageIndex], auswahlen[frageIndex] ?? []),
    );
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
          <FehlerMeldung nachricht={ki.fehler ?? quizFehler ?? ''} onErneutVersuchen={quizErstellen} />
        )}
      </section>

      {fragen !== null && artikel !== undefined && (
        <section className="karte" aria-labelledby="fragen-titel">
          <h2 id="fragen-titel">Fragen zu „{artikel.titel}“</h2>
          <p className="ki-kennzeichnung">KI-generierter Inhalt · kann Fehler enthalten</p>

          <form onSubmit={handleAuswerten}>
            {fragen.map((frage, frageIndex) => {
              const punkte = punkteProFrage?.[frageIndex] ?? null;
              return (
                <QuizFrageKarte
                  key={`${frageIndex}-${frage.frage}`}
                  frage={frage}
                  nummer={frageIndex + 1}
                  auswahl={auswahlen[frageIndex] ?? []}
                  onUmschalten={(antwortIndex) => handleUmschalten(frageIndex, antwortIndex)}
                  punkte={punkte}
                >
                  {/* Erklärung nur bei Fragen ohne volle Punktzahl */}
                  {punkte !== null && punkte < 1 && (
                    <p className="ki-aktionen">
                      <button
                        type="button"
                        onClick={() => handleWarum(frageIndex)}
                        disabled={erklaerung.isStreaming}
                      >
                        Warum? Erklärung anzeigen
                      </button>
                    </p>
                  )}
                  {erklaerteFrage === frageIndex && (
                    <KiAntwort
                      antwort={erklaerung.antwort}
                      isStreaming={erklaerung.isStreaming}
                      fehler={erklaerung.fehler}
                      hinweis={erklaerung.hinweis}
                      onAbbrechen={erklaerung.abbrechen}
                      onErneutVersuchen={() => handleWarum(frageIndex)}
                      ladeText="Die KI erklärt die Frage …"
                    />
                  )}
                </QuizFrageKarte>
              );
            })}

            {isAusgewertet ? (
              <>
                <p className="quiz-ergebnis" role="status">
                  Ergebnis: {gesamtPunkte.toLocaleString('de-AT', { maximumFractionDigits: 1 })} von{' '}
                  {fragen.length} Punkten
                </p>
                <button type="button" onClick={antwortenZuruecksetzen}>
                  Nochmal versuchen
                </button>
              </>
            ) : (
              <p className="ki-aktionen">
                <button type="submit">Auswerten</button>
              </p>
            )}
          </form>
        </section>
      )}
    </div>
  );
}

export default Quiz;
