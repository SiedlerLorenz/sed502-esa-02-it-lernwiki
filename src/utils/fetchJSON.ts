// Übersetzt einen HTTP-Statuscode in eine verständliche Fehlermeldung
export function erstelleFehlertext(status: number): string {
  if (status === 404) {
    return 'Der gesuchte Eintrag wurde nicht gefunden (404).';
  }
  if (status === 429) {
    return 'Zu viele Anfragen in kurzer Zeit. Bitte einen Moment warten und erneut versuchen (429).';
  }
  if (status >= 500) {
    return `Der Server ist gerade nicht erreichbar. Bitte später erneut versuchen (${status}).`;
  }
  return `Die Anfrage ist fehlgeschlagen (HTTP-Status ${status}).`;
}

// Lädt JSON-Daten von einer URL
// fetch() wirft bei 404 oder 500 keinen Fehler, deshalb wird antwort.ok selbst geprüft
export async function fetchJSON<T>(url: string, optionen?: RequestInit): Promise<T> {
  let antwort: Response;

  try {
    antwort = await fetch(url, optionen);
  } catch {
    // fetch() selbst wirft nur, wenn gar keine Verbindung zustande kommt
    throw new Error('Keine Verbindung zum Server. Bitte die Internetverbindung prüfen.');
  }

  if (!antwort.ok) {
    throw new Error(erstelleFehlertext(antwort.status));
  }

  // Die Struktur der Antwort wird über den Typparameter T beschrieben
  return antwort.json() as Promise<T>;
}
