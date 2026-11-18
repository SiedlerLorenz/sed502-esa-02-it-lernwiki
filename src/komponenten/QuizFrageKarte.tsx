import type { QuizFrage } from '../typen/quiz.ts';

interface QuizFrageKarteProps {
  frage: QuizFrage;
  nummer: number; // 1, 2, 3 … für die Anzeige
  auswahl: number[]; // Indizes der angekreuzten Antworten
  onUmschalten: (antwortIndex: number) => void;
}

// Eine Quizfrage mit fünf Antworten zum Ankreuzen (eine oder mehrere können richtig sein)
function QuizFrageKarte({ frage, nummer, auswahl, onUmschalten }: QuizFrageKarteProps): React.JSX.Element {
  return (
    // fieldset und legend fassen die Checkboxen einer Frage zusammen; Screenreader lesen die Frage mit vor
    <fieldset className="quiz-frage">
      <legend>
        Frage {nummer}: {frage.frage}
      </legend>
      <ul>
        {frage.antworten.map((antwort, index) => {
          const feldId = `frage-${nummer}-antwort-${index}`;
          return (
            // Die Reihenfolge der Antworten ändert sich nie, daher ist der Index als key hier eindeutig
            <li key={index}>
              <input
                type="checkbox"
                id={feldId}
                checked={auswahl.includes(index)}
                onChange={() => onUmschalten(index)}
              />
              <label htmlFor={feldId}>{antwort}</label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export default QuizFrageKarte;
