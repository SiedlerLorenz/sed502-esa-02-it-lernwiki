import { erstelleFehlertext } from './fetchJSON.ts';

// Übersetzt den HTTP-Status einer KI-Anfrage in eine verständliche Fehlermeldung.
// details: Text der Fehlerantwort von Gemini (z. B. mit der Art des überschrittenen Kontingents)
export function erstelleKiFehlertext(status: number, details = ''): string {
  if (status === 400 || status === 401 || status === 403) {
    return `Die KI hat die Anfrage abgelehnt. Bitte prüfen, ob in der Datei .env ein gültiger GEMINI_API_KEY eingetragen ist (${status}).`;
  }
  if (status === 404) {
    return 'Das eingestellte KI-Modell ist nicht verfügbar. Bitte GEMINI_MODELL in der Datei .env prüfen (404).';
  }
  if (status === 429) {
    // Gemini nennt das überschrittene Kontingent, z. B. "GenerateRequestsPerDayPerProjectPerModel-FreeTier"
    if (details.includes('PerDay')) {
      return 'Das kostenlose Tageskontingent der KI ist aufgebraucht. Es wird von Google täglich zurückgesetzt; alternativ kann in der Datei .env unter GEMINI_MODELL ein anderes Modell eingetragen werden (429).';
    }
    return 'Zu viele KI-Anfragen in kurzer Zeit. Bitte etwa eine Minute warten und erneut versuchen (429).';
  }
  if (status === 500 || status === 503) {
    return `Der KI-Dienst ist gerade überlastet. Bitte in ein paar Sekunden erneut versuchen (${status}).`;
  }
  // Alle übrigen Fälle wie bei normalen API-Anfragen behandeln
  return erstelleFehlertext(status);
}

// Liefert einen Hinweis, wenn die KI ihre Antwort nicht regulär beendet hat
export function beschreibeAbbruchgrund(grund: string | null): string | null {
  if (grund === 'MAX_TOKENS') {
    return 'Die Antwort wurde wegen der Längenbegrenzung gekürzt.';
  }
  if (grund === 'SAFETY' || grund === 'PROHIBITED_CONTENT') {
    return 'Die KI hat die Antwort aus Sicherheitsgründen abgebrochen.';
  }
  return null; // "STOP" oder kein Grund: Antwort ist vollständig
}
