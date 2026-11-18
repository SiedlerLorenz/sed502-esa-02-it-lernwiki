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
 * Format:    ausschließlich JSON in der Form { "fragen": QuizFrage[] }
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

// Punkte für eine Frage (0 bis 1), Teilpunkte mit Abzug:
// jede angekreuzte richtige Antwort  +1 / Anzahl richtiger Antworten
// jede angekreuzte falsche Antwort   −1 / Anzahl falscher Antworten
// Ergebnis nie unter 0, auf zwei Nachkommastellen gerundet
export function berechnePunkte(frage: QuizFrage, auswahl: number[]): number {
  const anzahlRichtig = frage.richtigeAntworten.length;
  const anzahlFalsch = ANTWORTEN_PRO_FRAGE - anzahlRichtig;

  const punkte = auswahl.reduce((summe, index) => {
    if (frage.richtigeAntworten.includes(index)) {
      return summe + 1 / anzahlRichtig;
    }
    return anzahlFalsch > 0 ? summe - 1 / anzahlFalsch : summe;
  }, 0);

  return Math.round(Math.max(0, punkte) * 100) / 100;
}

/*
 * System-Prompt für die Erklärung einer Quizfrage
 * Rolle:     geduldiger IT-Tutor
 * Aufgabe:   erklären, welche Antworten richtig sind und warum, mit Bezug auf die Auswahl der lernenden Person
 * Format:    reiner Text ohne Markdown, höchstens 120 Wörter, Deutsch
 * Grenzen:   Artikel plus gesichertes Fachwissen, freundlich, ohne Bewertung der Person
 */
export const ERKLAERUNG_SYSTEM_PROMPT = `Du bist ein geduldiger IT-Tutor im IT-Lernwiki.
Erkläre zu einer Quizfrage kurz, welche Antworten richtig sind und warum. Gehe dabei auf die Antworten ein, die die lernende Person falsch angekreuzt oder vergessen hat.
Regeln:
- Höchstens 120 Wörter, auf Deutsch, freundlich und leicht verständlich.
- Reiner Text ohne Markdown, keine Aufzählungszeichen mit Sternchen.
- Stütze dich auf den Artikel und gesichertes, allgemein anerkanntes Fachwissen; erfinde nichts dazu.`;

// Baut die Anfrage für die Erklärung einer Frage
export function erstelleErklaerungsPrompt(artikel: Artikel, frage: QuizFrage, auswahl: number[]): string {
  const zeilen = frage.antworten.map((antwort, index) => {
    const richtig = frage.richtigeAntworten.includes(index) ? 'richtig' : 'falsch';
    const angekreuzt = auswahl.includes(index) ? 'angekreuzt' : 'nicht angekreuzt';
    return `${index + 1}. ${antwort} (${richtig}, ${angekreuzt})`;
  });
  return [
    `Artikel: ${artikel.titel} – ${artikel.zusammenfassung}`,
    `Frage: ${frage.frage}`,
    'Antworten:',
    ...zeilen,
  ].join('\n');
}
