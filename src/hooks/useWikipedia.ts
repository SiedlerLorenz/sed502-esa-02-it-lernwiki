import type { WikipediaZusammenfassung } from '../typen/wikipedia.ts';
import { WIKIPEDIA_ANFRAGE, WIKIPEDIA_ZUSAMMENFASSUNG } from '../utils/wikipedia.ts';
import useFetch, { type UseFetchErgebnis } from './useFetch.ts';

// Lädt die Zusammenfassung eines Wikipedia-Artikels; bei titel = null wird nichts geladen
function useWikipedia(titel: string | null): UseFetchErgebnis<WikipediaZusammenfassung> {
  // encodeURIComponent: Sonderzeichen im Titel (z. B. Umlaute) werden für die URL umgewandelt
  const url = titel === null ? null : WIKIPEDIA_ZUSAMMENFASSUNG + encodeURIComponent(titel);
  return useFetch<WikipediaZusammenfassung>(url, WIKIPEDIA_ANFRAGE);
}

export default useWikipedia;
