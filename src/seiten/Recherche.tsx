import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch.ts';
import FehlerMeldung from '../komponenten/FehlerMeldung.tsx';
import Ladeanimation from '../komponenten/Ladeanimation.tsx';
import RechercheFormular from '../komponenten/RechercheFormular.tsx';
import SuchTreffer from '../komponenten/SuchTreffer.tsx';
import WikipediaInfo from '../komponenten/WikipediaInfo.tsx';
import type { WikipediaSuchantwort } from '../typen/wikipedia.ts';

const SUCH_API = 'https://de.wikipedia.org/w/rest.php/v1/search/page';
const MAX_TREFFER = 10;

// Recherche-Seite: freie Suche in der deutschen Wikipedia, erreichbar unter /recherche?q=…
function Recherche(): React.JSX.Element {
  // Der Suchbegriff steht in der URL (?q=…): Ergebnisse lassen sich so teilen und der Zurück-Button funktioniert
  const [suchParameter, setSuchParameter] = useSearchParams();
  const suchbegriff = suchParameter.get('q') ?? '';
  // Ausgewählter Treffer, ebenfalls in der URL (?auswahl=…)
  const auswahl = suchParameter.get('auswahl');

  // Bereich der Zusammenfassung, um nach einer Auswahl dorthin zu scrollen
  const zusammenfassungRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (auswahl !== null) {
      // Bei "Bewegung reduzieren" im Betriebssystem ohne Animation springen
      const ohneAnimation = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      zusammenfassungRef.current?.scrollIntoView({
        behavior: ohneAnimation ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, [auswahl]);

  // Ohne Suchbegriff ist die URL null, dann lädt useFetch nichts
  const url =
    suchbegriff === ''
      ? null
      : `${SUCH_API}?q=${encodeURIComponent(suchbegriff)}&limit=${MAX_TREFFER}`;
  const { daten, isLaden, fehler, neuLaden } = useFetch<WikipediaSuchantwort>(url);

  // Neue Suche: nur der Suchbegriff, eine alte Auswahl fällt weg
  const handleSuchen = (neuerBegriff: string): void => {
    setSuchParameter({ q: neuerBegriff });
  };

  // Auswahl ergänzen, der Suchbegriff bleibt erhalten (neues Objekt statt Änderung des alten)
  const handleAuswaehlen = (seitenKey: string): void => {
    setSuchParameter((bisher) => {
      const neu = new URLSearchParams(bisher);
      neu.set('auswahl', seitenKey);
      return neu;
    });
  };

  let ergebnis: React.ReactNode = null;
  if (isLaden) {
    ergebnis = <Ladeanimation text="Wikipedia wird durchsucht …" />;
  } else if (fehler !== null) {
    ergebnis = <FehlerMeldung nachricht={fehler} onErneutVersuchen={neuLaden} />;
  } else if (daten !== null) {
    ergebnis = (
      <>
        <p role="status">
          {daten.pages.length === 0
            ? `Keine Treffer für „${suchbegriff}“.`
            : `${daten.pages.length} Treffer für „${suchbegriff}“:`}
        </p>
        <ul className="trefferliste">
          {daten.pages.map((treffer) => (
            <li key={treffer.id}>
              <SuchTreffer
                treffer={treffer}
                isAusgewaehlt={treffer.key === auswahl}
                onAuswaehlen={handleAuswaehlen}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div className="detailseite">
      <section className="karte" aria-labelledby="recherche-titel">
        <h1 id="recherche-titel">Recherche</h1>
        <p>
          Hier lässt sich die gesamte deutsche Wikipedia durchsuchen, auch nach Begriffen, die es
          im IT-Lernwiki noch nicht gibt.
        </p>
        {/* key: Ändert sich der Suchbegriff in der URL (z. B. über Zurück), wird das Formular neu befüllt */}
        <RechercheFormular key={suchbegriff} startwert={suchbegriff} onSuchen={handleSuchen} />
      </section>

      {/* Zusammenfassung des ausgewählten Treffers (WikipediaInfo wird wiederverwendet) */}
      {auswahl !== null && (
        <div ref={zusammenfassungRef} className="scroll-ziel">
          <WikipediaInfo titel={auswahl} />
        </div>
      )}

      {suchbegriff !== '' && (
        <section className="karte" aria-labelledby="treffer-titel">
          <h2 id="treffer-titel">Ergebnisse</h2>
          {ergebnis}
        </section>
      )}
    </div>
  );
}

export default Recherche;
