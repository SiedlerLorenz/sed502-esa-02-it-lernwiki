import type { QuizFrage } from '../typen/quiz.ts';

interface QuizFrageKarteProps {
  frage: QuizFrage;
  nummer: number; // 1, 2, 3 … für die Anzeige
  auswahl: number[]; // Indizes der angekreuzten Antworten
  onUmschalten: (antwortIndex: number) => void;
  punkte: number | null; // null = noch nicht ausgewertet
  children?: React.ReactNode; // zusätzlicher Inhalt unter der Frage, z. B. die KI-Erklärung
}

// Liefert für eine Antwort nach der Auswertung Kennzeichnung und CSS-Klasse
function bewerteAntwort(istRichtig: boolean, istAngekreuzt: boolean): { text: string; klasse: string } {
  if (istRichtig && istAngekreuzt) {
    return { text: '✔ richtig', klasse: 'antwort-richtig' };
  }
  if (istRichtig) {
    return { text: '✔ richtig, nicht angekreuzt', klasse: 'antwort-vergessen' };
  }
  if (istAngekreuzt) {
    return { text: '✘ falsch angekreuzt', klasse: 'antwort-falsch' };
  }
  return { text: '', klasse: '' };
}

// Eine Quizfrage mit fünf Antworten zum Ankreuzen (eine oder mehrere können richtig sein)
function QuizFrageKarte({
  frage,
  nummer,
  auswahl,
  onUmschalten,
  punkte,
  children,
}: QuizFrageKarteProps): React.JSX.Element {
  const isAusgewertet = punkte !== null;

  return (
    // fieldset und legend fassen die Checkboxen einer Frage zusammen; Screenreader lesen die Frage mit vor
    <fieldset className="quiz-frage">
      <legend>
        Frage {nummer}: {frage.frage}
      </legend>
      <ul>
        {frage.antworten.map((antwort, index) => {
          const feldId = `frage-${nummer}-antwort-${index}`;
          const istAngekreuzt = auswahl.includes(index);
          const bewertung = isAusgewertet
            ? bewerteAntwort(frage.richtigeAntworten.includes(index), istAngekreuzt)
            : { text: '', klasse: '' };
          return (
            // Die Reihenfolge der Antworten ändert sich nie, daher ist der Index als key hier eindeutig
            <li key={index} className={bewertung.klasse}>
              <input
                type="checkbox"
                id={feldId}
                checked={istAngekreuzt}
                disabled={isAusgewertet}
                onChange={() => onUmschalten(index)}
              />
              <label htmlFor={feldId}>
                {antwort}
                {bewertung.text !== '' && <strong className="antwort-bewertung"> {bewertung.text}</strong>}
              </label>
            </li>
          );
        })}
      </ul>
      {isAusgewertet && (
        <p className="frage-punkte">
          {punkte.toLocaleString('de-AT')} von 1 Punkt
        </p>
      )}
      {children}
    </fieldset>
  );
}

export default QuizFrageKarte;
