import type { Kategorie } from '../typen/artikel.ts';

interface KategorienListeProps {
  anzahlen: Record<Kategorie, number>;
}

// Listet jede Kategorie mit der Anzahl ihrer Artikel auf
function KategorienListe({ anzahlen }: KategorienListeProps): React.JSX.Element {
  const kategorien = Object.keys(anzahlen) as Kategorie[];

  return (
    <ul className="kategorien-liste">
      {kategorien.map((name: Kategorie) => (
        <li key={name}>
          {name}: {anzahlen[name]}
        </li>
      ))}
    </ul>
  );
}

export default KategorienListe;
