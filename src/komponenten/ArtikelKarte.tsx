import { Link } from 'react-router-dom';
import type { Artikel } from '../typen/artikel.ts';

interface ArtikelKarteProps {
  artikel: Artikel;
}

// Zeigt einen Wiki-Artikel als Karte (entspricht erstelleArtikelElement aus ESA 1)
function ArtikelKarte({ artikel }: ArtikelKarteProps): React.JSX.Element {
  return (
    <article className="artikel-karte">
      <h3>
        <Link to={`/artikel/${artikel.id}`}>{artikel.titel}</Link>
      </h3>
      <p className="artikel-kategorie">{artikel.kategorie}</p>
      <p>{artikel.zusammenfassung}</p>

      {/* Das Beispiel ist optional: nur anzeigen, wenn es vorhanden ist */}
      {artikel.beispiel !== undefined && (
        <pre>
          <code>{artikel.beispiel}</code>
        </pre>
      )}

      <p className="artikel-stichwoerter">Stichwörter: {artikel.stichwoerter.join(', ')}</p>
    </article>
  );
}

export default ArtikelKarte;
