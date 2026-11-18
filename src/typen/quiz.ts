// Eine Multiple-Choice-Frage, wie sie die KI erzeugt
export interface QuizFrage {
  frage: string;
  antworten: string[]; // genau fünf Antwortmöglichkeiten
  richtigeAntworten: number[]; // Indizes der richtigen Antworten (1 bis 5 Einträge, je 0 bis 4)
}

// Erwartete JSON-Antwort der KI: { "fragen": [ … ] }
export interface QuizKiAntwort {
  fragen: QuizFrage[];
}
