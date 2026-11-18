import type { Kategorie } from '../typen/artikel.ts';

interface KategorienListeProps {
  anzahlen: Record<Kategorie, number>;
  aktiveKategorie: Kategorie | null; // null = alle Kategorien
  onAuswaehlen: (kategorie: Kategorie | null) => void;
}

// Listet jede Kategorie mit der Anzahl ihrer Artikel auf; ein Klick filtert die Artikelliste
function KategorienListe({ anzahlen, aktiveKategorie, onAuswaehlen }: KategorienListeProps): React.JSX.Element {
  const kategorien = Object.keys(anzahlen) as Kategorie[];

  return (
    <>
      <ul className="kategorien-liste">
        {kategorien.map((name: Kategorie) => {
          const isAktiv = name === aktiveKategorie;
          return (
            <li key={name}>
              {/* aria-pressed: Screenreader sagen an, ob dieser Filter gerade aktiv ist */}
              <button
                type="button"
                className={isAktiv ? 'kategorie-knopf aktiv' : 'kategorie-knopf'}
                aria-pressed={isAktiv}
                // Ein zweiter Klick auf die aktive Kategorie hebt den Filter wieder auf
                onClick={() => onAuswaehlen(isAktiv ? null : name)}
              >
                <span>{name}</span>
                <span className="kategorie-anzahl">{anzahlen[name]}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {aktiveKategorie !== null && (
        <p className="ki-aktionen">
          <button type="button" onClick={() => onAuswaehlen(null)}>
            Alle Kategorien anzeigen
          </button>
        </p>
      )}
    </>
  );
}

export default KategorienListe;
