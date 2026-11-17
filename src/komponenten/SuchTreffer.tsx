import type { WikipediaSuchtreffer } from '../typen/wikipedia.ts';
import { entferneHtml } from '../utils/text.ts';

interface SuchTrefferProps {
  treffer: WikipediaSuchtreffer;
}

// Zeigt einen Treffer der Wikipedia-Volltextsuche
function SuchTreffer({ treffer }: SuchTrefferProps): React.JSX.Element {
  const link = `https://de.wikipedia.org/wiki/${encodeURIComponent(treffer.key)}`;

  return (
    <article className="artikel-karte">
      <h3>{treffer.title}</h3>
      {treffer.description !== null && (
        <p className="artikel-kategorie">{treffer.description}</p>
      )}
      {/* Der Auszug enthält HTML-Markierungen der Suchbegriffe, die hier entfernt werden */}
      <p>{entferneHtml(treffer.excerpt)} …</p>
      <p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          Auf Wikipedia lesen (öffnet in neuem Tab)
        </a>
      </p>
    </article>
  );
}

export default SuchTreffer;
