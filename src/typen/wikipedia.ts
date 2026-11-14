// Typen für die Antworten der deutschen Wikipedia-REST-API
// Es sind nur die Felder beschrieben, die die Anwendung tatsächlich verwendet.

// Vorschaubild einer Seite
export interface WikipediaBild {
  source: string; // Adresse des Bildes
  width: number;
  height: number;
}

// Antwort von /api/rest_v1/page/summary/{titel}
export interface WikipediaZusammenfassung {
  type: 'standard' | 'disambiguation' | 'mainpage' | 'no-extract';
  title: string;
  description?: string; // Kurzbeschreibung, fehlt bei manchen Seiten
  extract: string; // Einleitung der Seite als reiner Text
  thumbnail?: WikipediaBild; // nicht jede Seite hat ein Bild
  content_urls: {
    desktop: {
      page: string; // Link zur vollständigen Seite
    };
  };
}

// Ein Treffer aus /w/rest.php/v1/search/page?q=…
export interface WikipediaSuchtreffer {
  id: number;
  key: string; // Seitentitel in URL-Schreibweise, z. B. "Docker_(Software)"
  title: string;
  excerpt: string; // Textausschnitt, enthält HTML-Markierungen der Suchbegriffe
  description: string | null;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  } | null;
}

// Gesamte Antwort der Suche
export interface WikipediaSuchantwort {
  pages: WikipediaSuchtreffer[];
}
