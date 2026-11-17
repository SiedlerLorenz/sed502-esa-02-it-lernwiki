// Typen für die Google-Gemini-API (Endpunkt streamGenerateContent)
// Es sind nur die Felder beschrieben, die die Anwendung tatsächlich verwendet.

// Wer spricht: die Person ("user") oder die KI ("model")
export type GeminiRolle = 'user' | 'model';

// Ein Textbaustein; Gemini teilt Nachrichten in "parts" auf
export interface GeminiTeil {
  text: string;
}

// Eine Nachricht im Gesprächsverlauf
export interface GeminiInhalt {
  role: GeminiRolle;
  parts: GeminiTeil[];
}

// Einstellungen für die Textgenerierung
export interface GeminiEinstellungen {
  temperature?: number; // 0 = sachlich und gleichbleibend, höher = kreativer
  maxOutputTokens?: number; // Obergrenze für die Länge der Antwort
  responseMimeType?: 'text/plain' | 'application/json'; // JSON erzwingt eine strukturierte Antwort
}

// Anfrage an /api/ki (wird vom Vite-Proxy an Gemini weitergeleitet)
export interface GeminiAnfrage {
  systemInstruction?: { parts: GeminiTeil[] }; // System-Prompt: Rolle und Regeln für die KI
  contents: GeminiInhalt[];
  generationConfig?: GeminiEinstellungen;
}

// Ein Teil der gestreamten Antwort (eine "data:"-Zeile)
export interface GeminiStreamTeil {
  candidates?: {
    content?: {
      parts?: { text?: string }[]; // text kann leer sein oder fehlen
    };
    finishReason?: string; // z. B. "STOP" (fertig), "MAX_TOKENS" oder "SAFETY"
  }[];
}

// Fehlerantwort von Gemini (z. B. bei ungültigem Schlüssel oder Überlastung)
export interface GeminiFehlerAntwort {
  error: {
    code: number;
    message: string;
    status: string; // z. B. "UNAVAILABLE" oder "PERMISSION_DENIED"
  };
}
