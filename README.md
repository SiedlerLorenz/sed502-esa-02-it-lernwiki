# IT-Lernwiki

Einsendeaufgabe 2 im Fach Front-End Development (SED502), Gruppenarbeit.
Gruppe: **Lorenz Siedler** und **Phillip Münsch**

## Projektbeschreibung

Das IT-Lernwiki ist ein Nachschlagewerk für IT-Einsteigerinnen und -Einsteiger, zum Beispiel
Studierende in den ersten Semestern. Es erklärt Grundbegriffe aus Programmiersprachen, Linux, Git,
Netzwerk, Webentwicklung, React und künstlicher Intelligenz in kurzen Artikeln mit Codebeispielen.

Aus dem statischen IT-Wiki der ESA 1 wurde eine React-Anwendung, die das eigene Wiki mit der
Wikipedia und einer KI verbindet: Zu jedem Artikel werden passende Wikipedia-Informationen geladen,
ein KI-Tutor erklärt den Stoff auf verschiedenen Niveaus und ein KI-Quiz prüft das Gelernte.

### Funktionen

| Seite | Adresse | Funktion |
|---|---|---|
| Startseite | `/` | 49 Artikel, alphabetisch sortiert, Live-Suche über Titel, Kategorie und Stichwörter, Filter nach Kategorie |
| Artikel | `/artikel/:id` | Artikel mit Codebeispiel, Zusammenfassung aus der Wikipedia, KI-Tutor, Link zum Quiz |
| Recherche | `/recherche?q=…` | Volltextsuche in der deutschen Wikipedia mit Validierung, Zusammenfassung zu einem ausgewählten Treffer |
| Quiz | `/quiz?artikel=…` | KI erstellt fünf Fragen mit je fünf Antworten (eine bis fünf richtig), Auswertung mit Teilpunkten, KI-Erklärung zu falschen Antworten |
| Nicht gefunden | jede andere Adresse | 404-Seite mit Link zur Startseite |

**KI-Tutor (Artikelseite):** erklärt den Artikel auf vier Niveaus (Einsteiger, Fortgeschritten,
Praxisbeispiel, Prüfungsvorbereitung) oder beantwortet eine eigene Frage. Grundlage sind der
Wiki-Artikel und die Wikipedia-Einleitung. Die Antwort wird gestreamt und kann abgebrochen und
kopiert werden.

**Quiz-Bewertung:** Pro Frage gibt es höchstens einen Punkt. Jede angekreuzte richtige Antwort
zählt 1 / (Anzahl richtiger Antworten), jede angekreuzte falsche Antwort zieht
1 / (Anzahl falscher Antworten) ab; eine Frage ergibt nie weniger als 0 Punkte.

## Verwendete Technologien

| Bereich | Technologie |
|---|---|
| Oberfläche | React 19 mit funktionalen Komponenten und Hooks |
| Sprache | TypeScript 7 im strict-Modus |
| Build und Entwicklungsserver | Vite 8 |
| Navigation | React Router 7 (`BrowserRouter`, `Routes`, `NavLink`, `useParams`, `useSearchParams`) |
| Linter | oxlint |
| Styling | eigenes CSS mit Variablen, responsiv, ohne Framework |

### Verwendete APIs

| API | Zweck | Schlüssel |
|---|---|---|
| [Wikipedia REST-API (de)](https://de.wikipedia.org/api/rest_v1/) `page/summary/{titel}` | Zusammenfassung, Bild und Link zu einem Artikel | nicht nötig |
| [Wikipedia Suche (de)](https://de.wikipedia.org/w/rest.php/v1/search/page) `search/page?q=…` | Volltextsuche auf der Recherche-Seite | nicht nötig |
| [Google Gemini API](https://ai.google.dev/) `streamGenerateContent` | KI-Tutor, Quizfragen, Erklärungen, Antworten gestreamt (Server-Sent Events) | kostenloser API-Schlüssel |

Alle drei Zustände eines API-Aufrufs (laden, Erfolg, Fehler) werden angezeigt; Fehler erscheinen als
verständliche Meldung mit „Erneut versuchen“.

## Installation und Start

Voraussetzung: [Node.js](https://nodejs.org/) (LTS, getestet mit 26.13).

```bash
git clone https://github.com/SiedlerLorenz/sed502-esa-02-it-lernwiki.git
cd sed502-esa-02-it-lernwiki
npm install
```

### API-Schlüssel für Gemini einrichten

1. Kostenlosen Schlüssel erstellen: <https://aistudio.google.com/apikey> (Google-Konto, keine Kreditkarte nötig).
2. Die Datei `.env.example` nach `.env` kopieren und den Schlüssel eintragen:

```bash
GEMINI_API_KEY=dein-schlüssel
# optional, Standard ist gemini-3.5-flash
GEMINI_MODELL=gemini-3.5-flash-lite
```

Die Datei `.env` ist in `.gitignore` eingetragen und gelangt nicht ins Repository. Der Schlüssel hat
bewusst **kein** `VITE_`-Präfix: Der Browser schickt KI-Anfragen an `/api/ki`, und erst der
Vite-Server (Proxy in `vite.config.ts`) hängt den Schlüssel an und leitet an Gemini weiter. So
erscheint der Schlüssel nie im JavaScript-Code, den der Browser lädt.

Hinweis: Der kostenlose Tarif erlaubt pro Modell nur eine begrenzte Zahl an Anfragen pro Tag (bei
`gemini-3.5-flash` 20). Ist das Kontingent aufgebraucht, zeigt die App das an; über `GEMINI_MODELL`
lässt sich ein anderes Modell mit eigenem Kontingent wählen, zum Beispiel `gemini-3.5-flash-lite`.

### Befehle

```bash
npm run dev      # Entwicklungsserver auf http://localhost:5173
npm run build    # Typprüfung (tsc) und Produktions-Build nach dist/
npm run preview  # gebauten Stand lokal ansehen (Proxy für die KI ist aktiv)
npm run lint     # Code mit oxlint prüfen
```

## Projektstruktur

```text
src/
  komponenten/   wiederverwendbare Bausteine (ArtikelKarte, KiAntwort, KiTutor, QuizFrageKarte, …)
  seiten/        eine Komponente pro Route (Startseite, ArtikelDetail, Recherche, Quiz, NichtGefunden)
  hooks/         Custom Hooks: useFetch, useWikipedia, useKI
  typen/         Interfaces und Union Types (artikel, wikipedia, ki, quiz, tutor)
  daten/         die Wiki-Artikel
  utils/         Logik ohne Oberfläche: Suche, Validierung, fetchJSON, KI-Stream, Prompts, Quiz-Bewertung
  App.tsx        Seitenlayout und Routen
  main.tsx       Einstiegspunkt mit BrowserRouter
vite.config.ts   Proxy /api/ki zur Gemini-API
```
