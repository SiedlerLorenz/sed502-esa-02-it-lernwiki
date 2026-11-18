import type { Artikel } from '../typen/artikel.ts';
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

/*
 * System-Prompt für die Quiz-Erstellung
 * Rolle:     Ersteller von Lernquizfragen für das IT-Lernwiki
 * Aufgabe:   genau 5 Fragen mit je 5 Antworten zu einem Wiki-Artikel
 * Format:    ausschließlich JSON in der Form von QuizKiAntwort
 * Grenzen:   Artikel plus gesichertes Fachwissen, nichts erfinden, Anzahl richtiger Antworten 1 bis 5
 */
export const QUIZ_SYSTEM_PROMPT = `Du erstellst Lernquizfragen für das IT-Lernwiki, ein Nachschlagewerk für IT-Einsteigerinnen und -Einsteiger.
Antworte ausschließlich mit JSON in genau dieser Form:
{"fragen":[{"frage":"…","antworten":["…","…","…","…","…"],"richtigeAntworten":[0,2]}]}
Regeln:
- Genau 5 Fragen mit je genau ${ANTWORTEN_PRO_FRAGE} Antworten, alles auf Deutsch.
- Jede Frage hat zwischen 1 und ${ANTWORTEN_PRO_FRAGE} richtige Antworten; variiere die Anzahl zwischen den Fragen.
- richtigeAntworten enthält die Indizes (0 bis ${ANTWORTEN_PRO_FRAGE - 1}) aller richtigen Antworten.
- Stütze dich in erster Linie auf den übergebenen Artikel und ergänze nur gesichertes, allgemein anerkanntes Fachwissen zum Thema; erfinde nichts dazu.
- Falsche Antworten sollen plausibel klingen, aber eindeutig falsch sein.`;

// Baut aus einem Wiki-Artikel die Anfrage an die KI
export function erstelleQuizPrompt(artikel: Artikel): string {
  const teile = [
    `Erstelle ein Quiz zu diesem Artikel aus dem IT-Lernwiki.`,
    `Titel: ${artikel.titel}`,
    `Kategorie: ${artikel.kategorie}`,
    `Inhalt: ${artikel.zusammenfassung}`,
    `Stichwörter: ${artikel.stichwoerter.join(', ')}`,
  ];
  if (artikel.beispiel !== undefined) {
    teile.push(`Beispiel:\n${artikel.beispiel}`);
  }
  return teile.join('\n');
}
