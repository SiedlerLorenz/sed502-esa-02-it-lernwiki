import { NavLink } from 'react-router-dom';

// Liefert die CSS-Klasse für einen Navigationslink: "aktiv", wenn seine Seite gerade angezeigt wird
function linkKlasse({ isActive }: { isActive: boolean }): string {
  return isActive ? 'aktiv' : '';
}

// Hauptnavigation der Anwendung
// NavLink setzt bei der aktuellen Seite zusätzlich aria-current="page" für Screenreader
function Navigation(): React.JSX.Element {
  return (
    <nav aria-label="Hauptnavigation">
      <ul>
        <li>
          <NavLink to="/" end className={linkKlasse}>
            Start
          </NavLink>
        </li>
        <li>
          <NavLink to="/recherche" className={linkKlasse}>
            Recherche
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
