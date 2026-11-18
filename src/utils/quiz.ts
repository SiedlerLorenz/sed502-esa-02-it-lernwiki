import type { QuizFrage } from '../typen/quiz.ts';

export const ANTWORTEN_PRO_FRAGE = 5;

// Prüft, ob eine Liste gültige, eindeutige Indizes richtiger Antworten enthält (mindestens einer)
function sindGueltigeIndizes(werte: unknown): werte is number[] {
  return (
    Array.isArray(werte) &&
    werte.length >= 1 &&
    werte.length <= ANTWORTEN_PRO_FRAGE &&
    werte.every(
      (index) => Number.isInteger(index) && index >= 0 && index < ANTWORTEN_PRO_FRAGE,
    ) &&
    new Set(werte).size === werte.length // keine doppelten Indizes
  );
}

// Type Guard: prüft zur Laufzeit, ob ein unbekannter Wert wirklich eine gültige QuizFrage ist.
// Der Rückgabetyp "wert is QuizFrage" teilt TypeScript das Ergebnis der Prüfung mit.
export function istQuizFrage(wert: unknown): wert is QuizFrage {
  if (typeof wert !== 'object' || wert === null) {
    return false;
  }
  const kandidat = wert as Record<string, unknown>;
  const { frage, antworten, richtigeAntworten } = kandidat;

  return (
    typeof frage === 'string' &&
    frage.trim() !== '' &&
    Array.isArray(antworten) &&
    antworten.length === ANTWORTEN_PRO_FRAGE &&
    antworten.every((antwort) => typeof antwort === 'string' && antwort.trim() !== '') &&
    sindGueltigeIndizes(richtigeAntworten)
  );
}

// Liest die Quizfragen aus dem JSON-Text der KI.
// Ungültige Fragen werden aussortiert; bleibt keine übrig, wird ein Fehler geworfen.
export function leseQuizFragen(text: string): QuizFrage[] {
  // Falls die KI das JSON trotzdem in einen Markdown-Codeblock packt, diesen entfernen
  const bereinigt = text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  let daten: unknown;
  try {
    daten = JSON.parse(bereinigt);
  } catch {
    throw new Error('Die KI hat keine lesbaren Quizfragen geliefert. Bitte erneut versuchen.');
  }

  const fragen: unknown =
    typeof daten === 'object' && daten !== null ? (daten as Record<string, unknown>).fragen : null;

  if (!Array.isArray(fragen)) {
    throw new Error('Die Antwort der KI enthält keine Quizfragen. Bitte erneut versuchen.');
  }

  const gueltige = fragen.filter(istQuizFrage);
  if (gueltige.length === 0) {
    throw new Error('Die Quizfragen der KI waren unvollständig. Bitte erneut versuchen.');
  }
  return gueltige;
}
