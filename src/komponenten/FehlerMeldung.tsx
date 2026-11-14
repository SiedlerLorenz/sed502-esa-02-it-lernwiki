interface FehlerMeldungProps {
  nachricht: string;
  onErneutVersuchen?: () => void; // optional: wenn vorhanden, wird ein Button angezeigt
}

// Zeigt eine Fehlermeldung und optional einen Button für einen neuen Versuch
// role="alert": Screenreader lesen die Meldung sofort vor
function FehlerMeldung({ nachricht, onErneutVersuchen }: FehlerMeldungProps): React.JSX.Element {
  return (
    <section className="fehlermeldung" role="alert">
      <p>
        {/* Symbol zusätzlich zur Farbe, damit der Fehler nicht nur über Rot erkennbar ist */}
        <span aria-hidden="true">⚠ </span>
        {nachricht}
      </p>
      {onErneutVersuchen !== undefined && (
        <button type="button" onClick={onErneutVersuchen}>
          Erneut versuchen
        </button>
      )}
    </section>
  );
}

export default FehlerMeldung;
