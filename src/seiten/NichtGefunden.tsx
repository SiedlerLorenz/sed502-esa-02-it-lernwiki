import { Link, useLocation } from 'react-router-dom';

// 404-Seite: wird für jede URL angezeigt, zu der es keine Route gibt
function NichtGefunden(): React.JSX.Element {
  // useLocation liefert die aktuell aufgerufene Adresse, um sie in der Meldung zu nennen
  const { pathname } = useLocation();

  return (
    <section className="karte" aria-labelledby="nicht-gefunden-titel">
      <h1 id="nicht-gefunden-titel">404 - Seite nicht gefunden</h1>
      <p>
        Unter der Adresse <code>{pathname}</code> gibt es leider keine Seite.
      </p>
      <p>
        <Link to="/">Zurück zur Startseite</Link>
      </p>
    </section>
  );
}

export default NichtGefunden;
