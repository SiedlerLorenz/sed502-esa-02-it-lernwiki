import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrollt bei jedem Seitenwechsel an den Seitenanfang
// (React Router behält sonst die Scrollposition der vorherigen Seite bei)
function NachObenScrollen(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Die Komponente zeigt selbst nichts an
  return null;
}

export default NachObenScrollen;
