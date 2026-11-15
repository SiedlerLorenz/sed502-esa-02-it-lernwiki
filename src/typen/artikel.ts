// Mögliche Kategorien des Wikis (Union Type: nur diese Werte sind erlaubt)
export type Kategorie = 'Programmiersprachen' | 'Linux' | 'Git' | 'Netzwerk' | 'Webentwicklung' | 'React';

// Beschreibt die Datenstruktur eines Wiki-Artikels
export interface Artikel {
  readonly id: number; // readonly: nach dem Anlegen nicht mehr änderbar
  titel: string;
  kategorie: Kategorie;
  zusammenfassung: string;
  stichwoerter: string[];
  beispiel?: string; // optional: Code-Snippet oder Befehle zum Artikel
  wikipediaTitel: string; // Seitentitel in der deutschen Wikipedia (für die REST-API)
}
