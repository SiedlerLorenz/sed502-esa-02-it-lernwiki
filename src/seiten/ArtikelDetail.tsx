import { Link, useParams } from 'react-router-dom';
import { artikelListe } from '../daten/artikel.ts';

// Detailseite eines Wiki-Artikels, erreichbar unter /artikel/:id
function ArtikelDetail(): React.JSX.Element {
  // useParams liest den variablen Teil der URL, z. B. "3" aus /artikel/3
  const { id } = useParams<{ id: string }>();
  const artikel = artikelListe.find((eintrag) => eintrag.id === Number(id));

  // Unbekannte oder ungültige ID (z. B. /artikel/999 oder /artikel/abc)
  if (artikel === undefined) {
    return (
      <section className="karte" aria-labelledby="detail-titel">
        <h1 id="detail-titel">Artikel nicht gefunden</h1>
        <p>Zu dieser Adresse gibt es keinen Artikel im IT-Lernwiki.</p>
        <p>
          <Link to="/">Zur Artikelübersicht</Link>
        </p>
      </section>
    );
  }

  return (
    <article className="karte artikel-detail" aria-labelledby="detail-titel">
      <p>
        <Link to="/">← Zur Artikelübersicht</Link>
      </p>
      <h1 id="detail-titel">{artikel.titel}</h1>
      <p className="artikel-kategorie">{artikel.kategorie}</p>
      <p>{artikel.zusammenfassung}</p>

      {artikel.beispiel !== undefined && (
        <pre>
          <code>{artikel.beispiel}</code>
        </pre>
      )}

      <p className="artikel-stichwoerter">Stichwörter: {artikel.stichwoerter.join(', ')}</p>
    </article>
  );
}

export default ArtikelDetail;
