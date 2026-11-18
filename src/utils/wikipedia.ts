// Adressen der Wikipedia-REST-API (deutsche Wikipedia)
export const WIKIPEDIA_ZUSAMMENFASSUNG = 'https://de.wikipedia.org/api/rest_v1/page/summary/';
export const WIKIPEDIA_SUCHE = 'https://de.wikipedia.org/w/rest.php/v1/search/page';

// Wikimedia bittet Anwendungen, sich bei API-Anfragen zu erkennen zu geben.
// Browser erlauben keinen eigenen User-Agent, deshalb wird der Header Api-User-Agent verwendet.
// Außerhalb einer Komponente, damit das Objekt stabil bleibt (Abhängigkeit in useFetch).
export const WIKIPEDIA_ANFRAGE: RequestInit = {
  headers: {
    'Api-User-Agent': 'IT-Lernwiki/1.0 (https://github.com/SiedlerLorenz/sed502-esa-02-it-lernwiki)',
  },
};
