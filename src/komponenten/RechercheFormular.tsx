import { useState } from 'react';
import { pruefeSuchbegriff, SUCHBEGRIFF_MAX } from '../utils/validierung.ts';

interface RechercheFormularProps {
  startwert: string; // Suchbegriff, mit dem das Feld gefüllt wird (z. B. aus der URL)
  onSuchen: (suchbegriff: string) => void; // wird nur mit gültigem Suchbegriff aufgerufen
}

// Suchformular mit Validierung: Fehler werden beim Absenden geprüft und danach live aktualisiert
function RechercheFormular({ startwert, onSuchen }: RechercheFormularProps): React.JSX.Element {
  const [eingabe, setEingabe] = useState<string>(startwert);
  const [fehler, setFehler] = useState<string | null>(null);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const meldung = pruefeSuchbegriff(eingabe);
    setFehler(meldung);
    if (meldung === null) {
      onSuchen(eingabe.trim());
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const wert = event.target.value;
    setEingabe(wert);
    // Wird bereits ein Fehler angezeigt, verschwindet er, sobald die Eingabe gültig ist
    if (fehler !== null) {
      setFehler(pruefeSuchbegriff(wert));
    }
  };

  return (
    <form role="search" className="recherche-formular" onSubmit={handleSubmit} noValidate>
      <label htmlFor="recherche-feld">Suchbegriff für die Wikipedia</label>
      <p className="formular-zeile">
        <input
          type="search"
          id="recherche-feld"
          name="q"
          autoComplete="off"
          maxLength={SUCHBEGRIFF_MAX}
          value={eingabe}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={fehler !== null}
          aria-describedby={fehler !== null ? 'recherche-fehler' : undefined}
        />
        <button type="submit">Suchen</button>
      </p>
      {fehler !== null && (
        <p id="recherche-fehler" className="feldfehler" role="alert">
          <span aria-hidden="true">⚠ </span>
          {fehler}
        </p>
      )}
    </form>
  );
}

export default RechercheFormular;
