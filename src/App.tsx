import { Link, Route, Routes } from 'react-router-dom';
import Navigation from './komponenten/Navigation.tsx';
import NichtGefunden from './seiten/NichtGefunden.tsx';
import Startseite from './seiten/Startseite.tsx';

// Wurzelkomponente: gemeinsames Seitenlayout und Zuordnung von URL zu Seite
function App(): React.JSX.Element {
  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Hauptinhalt springen
      </a>

      <header className="kopfbereich">
        <p className="seitenname">
          <Link to="/">IT-Lernwiki</Link>
        </p>
        <Navigation />
      </header>

      <main id="inhalt">
        <Routes>
          <Route path="/" element={<Startseite />} />
          {/* Alle übrigen URLs: eigene 404-Seite */}
          <Route path="*" element={<NichtGefunden />} />
        </Routes>
      </main>

      <footer className="fussbereich">
        <p>
          Einsendeaufgabe 2 · Front-End Development (SED502) · Lorenz Siedler und Phillip Münsch
        </p>
      </footer>
    </>
  );
}

export default App;
