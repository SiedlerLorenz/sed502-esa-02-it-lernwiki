import { useState } from 'react';
import ArtikelKarte from '../komponenten/ArtikelKarte.tsx';
import KategorienListe from '../komponenten/KategorienListe.tsx';
import Suchfeld from '../komponenten/Suchfeld.tsx';
import { artikelListe } from '../daten/artikel.ts';
import type { Kategorie } from '../typen/artikel.ts';
import {
  filtereArtikel,
  filtereNachKategorie,
  sortiereNachTitel,
  zaehleKategorien,
} from '../utils/suche.ts';

// Formuliert die Statusmeldung für Screenreader und Sehende
function erstelleStatusText(treffer: number, gesamt: number, kategorie: Kategorie | null): string {
  const bereich = kategorie === null ? '' : ` in der Kategorie „${kategorie}“`;
  if (treffer === 0) {
    return `Keine Artikel${bereich} gefunden.`;
  }
  return `${treffer} von ${gesamt} Artikeln${bereich} gefunden.`;
}

// Die Artikel ändern sich nie, deshalb einmalig außerhalb der Komponente sortieren und zählen
const sortierteArtikel = sortiereNachTitel(artikelListe);
const kategorienAnzahlen = zaehleKategorien(artikelListe);

// Startseite: Live-Suche über alle Wiki-Artikel, Filter nach Kategorie und Übersicht der Kategorien
function Startseite(): React.JSX.Element {
  const [suchbegriff, setSuchbegriff] = useState<string>('');
  const [aktiveKategorie, setAktiveKategorie] = useState<Kategorie | null>(null);

  // Erst nach Kategorie vorfiltern, dann innerhalb dieser Auswahl suchen (kein eigener State nötig)
  const inKategorie = filtereNachKategorie(sortierteArtikel, aktiveKategorie);
  const treffer = filtereArtikel(inKategorie, suchbegriff);

  return (
    <div className="startseite">
      <section className="karte bereich-suche" aria-labelledby="startseite-titel">
        <h1 id="startseite-titel">IT-Lernwiki</h1>
        <p>
          Nachschlagewerk zu Programmiersprachen, Linux, Git, Netzwerk, Webentwicklung, React und
          künstlicher Intelligenz. Die Artikel lassen sich durchsuchen und nach Kategorie filtern.
        </p>
        <Suchfeld wert={suchbegriff} onAendern={setSuchbegriff} />
      </section>

      <section className="karte bereich-artikel" aria-labelledby="artikel-titel">
        <h2 id="artikel-titel">
          {aktiveKategorie === null ? 'Artikel' : `Artikel: ${aktiveKategorie}`}
        </h2>
        <p role="status" aria-live="polite">
          {erstelleStatusText(treffer.length, inKategorie.length, aktiveKategorie)}
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
        <p>Zum Filtern eine Kategorie auswählen:</p>
        <KategorienListe
          anzahlen={kategorienAnzahlen}
          aktiveKategorie={aktiveKategorie}
          onAuswaehlen={setAktiveKategorie}
        />
      </aside>
    </div>
  );
}

export default Startseite;
