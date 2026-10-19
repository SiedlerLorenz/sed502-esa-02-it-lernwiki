import './style.css';
import { artikelListe, type Artikel, type Kategorie } from './daten.ts';
import { filtereArtikel, zaehleKategorien } from './logik.ts';

// Holt ein Element aus dem DOM und bricht mit klarer Meldung ab, falls es fehlt
function holeElement<T extends HTMLElement>(selektor: string): T {
  const element = document.querySelector<T>(selektor);
  if (element === null) {
    throw new Error(`Element "${selektor}" wurde im HTML nicht gefunden.`);
  }
  return element;
}

// Baut aus einem Artikel das passende <li><article>…</article></li>
// textContent statt innerHTML: Inhalte werden nie als HTML interpretiert
function erstelleArtikelElement(artikel: Artikel): HTMLLIElement {
  const eintrag = document.createElement('li');
  const container = document.createElement('article');

  const titel = document.createElement('h3');
  titel.textContent = artikel.titel;

  const kategorie = document.createElement('p');
  kategorie.className = 'artikel-kategorie';
  kategorie.textContent = artikel.kategorie;

  const text = document.createElement('p');
  text.textContent = artikel.zusammenfassung;

  container.append(titel, kategorie, text);

  // Das Beispiel ist optional: nur anzeigen, wenn es vorhanden ist
  if (artikel.beispiel !== undefined) {
    const block = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = artikel.beispiel;
    block.append(code);
    container.append(block);
  }

  const stichwoerter = document.createElement('p');
  stichwoerter.className = 'artikel-stichwoerter';
  stichwoerter.textContent = `Stichwörter: ${artikel.stichwoerter.join(', ')}`;

  container.append(stichwoerter);
  eintrag.append(container);
  return eintrag;
}

// Formuliert die Statusmeldung für Screenreader und Sehende
function erstelleStatusText(treffer: number, gesamt: number): string {
  if (treffer === 0) {
    return 'Keine Artikel gefunden.';
  }
  return `${treffer} von ${gesamt} Artikeln gefunden.`;
}

const suchfeld = holeElement<HTMLInputElement>('#suchfeld');
const suchformular = holeElement<HTMLFormElement>('#suchformular');
const trefferliste = holeElement<HTMLUListElement>('#trefferliste');
const trefferanzahl = holeElement<HTMLParagraphElement>('#trefferanzahl');
const kategorienliste = holeElement<HTMLUListElement>('#kategorienliste');

// Rendert die Liste jedes Mal komplett neu aus dem Array
function zeigeArtikel(artikel: Artikel[]): void {
  trefferliste.replaceChildren(...artikel.map(erstelleArtikelElement));
  trefferanzahl.textContent = erstelleStatusText(artikel.length, artikelListe.length);
}

function zeigeKategorien(): void {
  const anzahlen = zaehleKategorien(artikelListe);
  const eintraege = (Object.keys(anzahlen) as Kategorie[]).map((name: Kategorie) => {
    const li = document.createElement('li');
    li.textContent = `${name}: ${anzahlen[name]}`;
    return li;
  });
  kategorienliste.replaceChildren(...eintraege);
}

// Live-Suche: bei jeder Eingabe wird neu gefiltert
suchfeld.addEventListener('input', () => {
  zeigeArtikel(filtereArtikel(artikelListe, suchfeld.value));
});

// Enter im Suchfeld soll die Seite nicht neu laden
suchformular.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();
});

zeigeArtikel(artikelListe);
zeigeKategorien();
