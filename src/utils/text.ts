// Entfernt HTML-Markierungen aus einem Text und wandelt Zeichen wie &quot; zurück in normale Zeichen.
// DOMParser führt dabei keine Skripte aus; das Ergebnis wird als reiner Text angezeigt.
export function entferneHtml(html: string): string {
  const dokument = new DOMParser().parseFromString(html, 'text/html');
  return dokument.body.textContent ?? '';
}
