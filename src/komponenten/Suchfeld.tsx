// Props des Suchfelds: der aktuelle Suchbegriff und eine Funktion, die bei jeder Eingabe aufgerufen wird
interface SuchfeldProps {
  wert: string;
  onAendern: (neuerWert: string) => void;
}

// Kontrolliertes Eingabefeld: Der angezeigte Text kommt immer aus dem State der Elternkomponente
function Suchfeld({ wert, onAendern }: SuchfeldProps): React.JSX.Element {
  // Enter im Suchfeld soll die Seite nicht neu laden
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onAendern(event.target.value);
  };

  return (
    <form role="search" onSubmit={handleSubmit}>
      <label htmlFor="suchfeld">Suchbegriff</label>
      <input
        type="search"
        id="suchfeld"
        name="suche"
        autoComplete="off"
        value={wert}
        onChange={handleChange}
      />
    </form>
  );
}

export default Suchfeld;
