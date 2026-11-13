import { useState } from 'react';
import ArtikelKarte from '../komponenten/ArtikelKarte.tsx';
import KategorienListe from '../komponenten/KategorienListe.tsx';
import Suchfeld from '../komponenten/Suchfeld.tsx';
import { artikelListe } from '../daten/artikel.ts';
import { filtereArtikel, zaehleKategorien } from '../utils/suche.ts';

// Formuliert die Statusmeldung für Screenreader und Sehende
function erstelleStatusText(treffer: number, gesamt: number): string {
  if (treffer === 0) {
    return 'Keine Artikel gefunden.';
  }
  return `${treffer} von ${gesamt} Artikeln gefunden.`;
}

// Die Kategorien ändern sich nie, deshalb einmalig außerhalb der Komponente zählen
const kategorienAnzahlen = zaehleKategorien(artikelListe);

// Startseite: Live-Suche über alle Wiki-Artikel und Übersicht der Kategorien
function Startseite(): React.JSX.Element {
  const [suchbegriff, setSuchbegriff] = useState<string>('');

  // Die Trefferliste wird bei jedem Rendern aus dem Suchbegriff berechnet (kein eigener State nötig)
  const treffer = filtereArtikel(artikelListe, suchbegriff);

  return (
    <div className="startseite">
      <section className="karte bereich-suche" aria-labelledby="startseite-titel">
        <h1 id="startseite-titel">IT-Lernwiki</h1>
        <p>
          Nachschlagewerk zu Programmiersprachen, Linux, Git und Netzwerk. Die Artikel lassen
          sich nach Titel, Kategorie und Stichwörtern durchsuchen.
        </p>
        <Suchfeld wert={suchbegriff} onAendern={setSuchbegriff} />
      </section>

      <section className="karte bereich-artikel" aria-labelledby="artikel-titel">
        <h2 id="artikel-titel">Artikel</h2>
        <p role="status" aria-live="polite">
          {erstelleStatusText(treffer.length, artikelListe.length)}
        </p>
        <ul className="trefferliste">
          {treffer.map((artikel) => (
            <li key={artikel.id}>
              <ArtikelKarte artikel={artikel} />
            </li>
          ))}
        </ul>
      </section>

      <aside className="karte bereich-kategorien" aria-labelledby="kategorien-titel">
        <h2 id="kategorien-titel">Kategorien</h2>
        <p>Anzahl der Artikel pro Kategorie:</p>
        <KategorienListe anzahlen={kategorienAnzahlen} />
      </aside>
    </div>
  );
}

export default Startseite;
