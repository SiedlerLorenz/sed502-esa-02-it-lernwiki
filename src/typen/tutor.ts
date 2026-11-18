// Niveau, auf dem der KI-Tutor einen Artikel erklärt
export type TutorNiveau = 'einsteiger' | 'fortgeschritten' | 'praxis' | 'pruefung';

// Eine Auswahlmöglichkeit für das Niveau
export interface NiveauOption {
  wert: TutorNiveau;
  bezeichnung: string; // Text für die Oberfläche
  beschreibung: string; // kurzer Hinweis unter der Bezeichnung
  anweisung: string; // Teil des Prompts für die KI
}
