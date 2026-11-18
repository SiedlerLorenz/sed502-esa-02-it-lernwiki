import type { WikipediaZusammenfassung } from '../typen/wikipedia.ts';
import useFetch, { type UseFetchErgebnis } from './useFetch.ts';

const API_BASIS = 'https://de.wikipedia.org/api/rest_v1/page/summary/';

// Lädt die Zusammenfassung eines Wikipedia-Artikels; bei titel = null wird nichts geladen
function useWikipedia(titel: string | null): UseFetchErgebnis<WikipediaZusammenfassung> {
  // encodeURIComponent: Sonderzeichen im Titel (z. B. Umlaute) werden für die URL umgewandelt
  const url = titel === null ? null : API_BASIS + encodeURIComponent(titel);
  return useFetch<WikipediaZusammenfassung>(url);
}

export default useWikipedia;
