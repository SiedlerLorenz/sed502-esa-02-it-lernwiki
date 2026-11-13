import type { Artikel, Kategorie } from '../typen/artikel.ts';

// Macht Texte vergleichbar: Kleinschreibung, ohne Umlaut-Akzente, ohne Leerraum am Rand
// ("Einrückung" wird dadurch auch bei der Eingabe "einruckung" gefunden)
export function normalisiere(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

// Liefert alle Artikel, bei denen jedes Wort des Suchbegriffs in Titel,
// Kategorie oder Stichwörtern vorkommt. Ein leerer Suchbegriff liefert alle Artikel.
export function filtereArtikel(artikel: Artikel[], suchbegriff: string): Artikel[] {
  const woerter: string[] = normalisiere(suchbegriff)
    .split(/\s+/)
    .filter((wort: string) => wort !== '');

  return artikel.filter((eintrag: Artikel): boolean => {
    const durchsuchbarerText: string = normalisiere(
      [eintrag.titel, eintrag.kategorie, ...eintrag.stichwoerter].join(' '),
    );
    return woerter.every((wort: string) => durchsuchbarerText.includes(wort));
  });
}

// Zählt, wie viele Artikel es pro Kategorie gibt
export function zaehleKategorien(artikel: Artikel[]): Record<Kategorie, number> {
  const anfangswert: Record<Kategorie, number> = {
    Programmiersprachen: 0,
    Linux: 0,
    Git: 0,
    Netzwerk: 0,
  };

  return artikel.reduce((zaehler: Record<Kategorie, number>, eintrag: Artikel) => {
    zaehler[eintrag.kategorie] += 1;
    return zaehler;
  }, anfangswert);
}
