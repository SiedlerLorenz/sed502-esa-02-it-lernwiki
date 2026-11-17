import { useSearchParams } from 'react-router-dom';
import RechercheFormular from '../komponenten/RechercheFormular.tsx';

// Recherche-Seite: freie Suche in der deutschen Wikipedia, erreichbar unter /recherche?q=…
function Recherche(): React.JSX.Element {
  // Der Suchbegriff steht in der URL (?q=…): Ergebnisse lassen sich so teilen und der Zurück-Button funktioniert
  const [suchParameter, setSuchParameter] = useSearchParams();
  const suchbegriff = suchParameter.get('q') ?? '';

  const handleSuchen = (neuerBegriff: string): void => {
    setSuchParameter({ q: neuerBegriff });
  };

  return (
    <section className="karte" aria-labelledby="recherche-titel">
      <h1 id="recherche-titel">Recherche</h1>
      <p>
        Hier lässt sich die gesamte deutsche Wikipedia durchsuchen, auch nach Begriffen, die es im
        IT-Lernwiki noch nicht gibt.
      </p>
      {/* key: Ändert sich der Suchbegriff in der URL (z. B. über Zurück), wird das Formular neu befüllt */}
      <RechercheFormular key={suchbegriff} startwert={suchbegriff} onSuchen={handleSuchen} />
      {suchbegriff !== '' && <p>Suchbegriff: {suchbegriff}</p>}
    </section>
  );
}

export default Recherche;
