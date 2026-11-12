import { Navigate, Route, Routes } from 'react-router-dom';
import Startseite from './seiten/Startseite.tsx';

// Wurzelkomponente: legt fest, welche Seite zu welcher URL gehört
function App(): React.JSX.Element {
  return (
    <main id="inhalt">
      <Routes>
        <Route path="/" element={<Startseite />} />
        {/* Unbekannte URLs vorerst auf die Startseite umleiten */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
