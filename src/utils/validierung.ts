export const SUCHBEGRIFF_MIN = 2;
export const SUCHBEGRIFF_MAX = 100;

// Prüft einen Suchbegriff und liefert eine Fehlermeldung oder null, wenn er gültig ist
export function pruefeSuchbegriff(eingabe: string): string | null {
  const text = eingabe.trim();

  if (text === '') {
    return 'Bitte einen Suchbegriff eingeben.';
  }
  if (text.length < SUCHBEGRIFF_MIN) {
    return `Der Suchbegriff muss mindestens ${SUCHBEGRIFF_MIN} Zeichen lang sein.`;
  }
  if (text.length > SUCHBEGRIFF_MAX) {
    return `Der Suchbegriff darf höchstens ${SUCHBEGRIFF_MAX} Zeichen lang sein.`;
  }
  return null;
}

export const TUTOR_FRAGE_MIN = 5;
export const TUTOR_FRAGE_MAX = 300;

// Prüft eine eigene Frage an den KI-Tutor und liefert eine Fehlermeldung oder null
export function pruefeTutorFrage(eingabe: string): string | null {
  const text = eingabe.trim();

  if (text === '') {
    return 'Bitte eine Frage eingeben.';
  }
  if (text.length < TUTOR_FRAGE_MIN) {
    return `Die Frage muss mindestens ${TUTOR_FRAGE_MIN} Zeichen lang sein.`;
  }
  if (text.length > TUTOR_FRAGE_MAX) {
    return `Die Frage darf höchstens ${TUTOR_FRAGE_MAX} Zeichen lang sein.`;
  }
  return null;
}
