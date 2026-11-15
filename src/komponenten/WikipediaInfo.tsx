import useFetch from '../hooks/useFetch.ts';
import type { WikipediaZusammenfassung } from '../typen/wikipedia.ts';
import FehlerMeldung from './FehlerMeldung.tsx';
import Ladeanimation from './Ladeanimation.tsx';

interface WikipediaInfoProps {
  titel: string; // Seitentitel in der deutschen Wikipedia, z. B. "Unix-Shell"
}

const API_BASIS = 'https://de.wikipedia.org/api/rest_v1/page/summary/';

// Lädt die Zusammenfassung eines Wikipedia-Artikels und zeigt Laden, Fehler oder Ergebnis an
function WikipediaInfo({ titel }: WikipediaInfoProps): React.JSX.Element {
  // encodeURIComponent: Sonderzeichen im Titel (z. B. Umlaute) werden für die URL umgewandelt
  const { daten, isLaden, fehler, neuLaden } = useFetch<WikipediaZusammenfassung>(
    API_BASIS + encodeURIComponent(titel),
  );

  // Je nach Zustand wird ein anderer Inhalt angezeigt
  let inhalt: React.ReactNode;

  if (isLaden) {
    inhalt = <Ladeanimation text="Wikipedia wird abgefragt …" />;
  } else if (fehler !== null) {
    inhalt = <FehlerMeldung nachricht={fehler} onErneutVersuchen={neuLaden} />;
  } else if (daten !== null) {
    inhalt = (
      <>
        <div className="wikipedia-inhalt">
          {daten.thumbnail !== undefined && (
            <img
              src={daten.thumbnail.source}
              width={daten.thumbnail.width}
              height={daten.thumbnail.height}
              alt={`Vorschaubild zum Wikipedia-Artikel „${daten.title}“`}
              loading="lazy"
            />
          )}
          <div>
            <h3>{daten.title}</h3>
            {daten.description !== undefined && (
              <p className="wikipedia-beschreibung">{daten.description}</p>
            )}
            {daten.type === 'disambiguation' && (
              <p>Dieser Begriff hat in der Wikipedia mehrere Bedeutungen.</p>
            )}
            <p>{daten.extract}</p>
          </div>
        </div>
        <p className="wikipedia-quelle">
          <a href={daten.content_urls.desktop.page} target="_blank" rel="noopener noreferrer">
            Vollständigen Artikel auf Wikipedia lesen (öffnet in neuem Tab)
          </a>
          <br />
          Quelle: Wikipedia, Lizenz CC BY-SA 4.0
        </p>
      </>
    );
  }

  return (
    <section className="karte wikipedia-info" aria-labelledby="wikipedia-titel">
      <h2 id="wikipedia-titel">Wikipedia-Eintrag</h2>
      {inhalt}
    </section>
  );
}

export default WikipediaInfo;
