# IT-Lernwiki

Einsendeaufgabe 2 - Front-End Development (SED502), Gruppenarbeit.
Gruppe: **Lorenz Siedler** und **Phillip Münsch**

## Projektbeschreibung

Das IT-Lernwiki ist ein Nachschlagewerk für IT-Einsteigerinnen und -Einsteiger, zum Beispiel
Studierende in den ersten Semestern oder Hobby-Programmierer. Es erklärt Grundbegriffe aus Programmiersprachen, Linux, Git, Netzwerk, Webentwicklung, React und künstlicher Intelligenz in kurzen Artikeln mit Codebeispielen.

Aus dem statischen IT-Wiki der ESA 1 wurde eine React-Anwendung, die das eigene Wiki mit 
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
verständliche Meldung mit „Erneut versuchen“. Anfragen an die Wikipedia geben sich mit dem Header
`Api-User-Agent` als IT-Lernwiki zu erkennen, wie es die API-Regeln von Wikimedia vorsehen.

**Streaming:** Die Antworten des KI-Tutors und die Erklärungen im Quiz erscheinen Wort für Wort,
sobald sie eintreffen, und lassen sich abbrechen. Die Quizfragen selbst liefert die KI als JSON; sie
werden erst angezeigt, wenn sie vollständig und geprüft sind, da unvollständiges JSON nicht lesbar
ist. Bis dahin erscheint eine Ladeanzeige.

## Installation und Start

Voraussetzung: [Node.js](https://nodejs.org/) (LTS, getestet mit 26.13).

```bash
git clone https://github.com/SiedlerLorenz/sed502-esa-02-it-lernwiki.git
cd sed502-esa-02-it-lernwiki
npm install
```

### API-Schlüssel für Gemini einrichten

1. Kostenlosen Schlüssel erstellen: <https://aistudio.google.com/apikey>.
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

Hinweis: Der Proxy `/api/ki` läuft nur mit `npm run dev` und `npm run preview`. Wird ausschließlich
der Ordner `dist/` auf einen Webserver gelegt, fehlt er und die KI-Funktionen antworten nicht. Für die
Veröffentlichung (ESA 3) übernimmt eine Serverless Function diese Aufgabe unter derselben Adresse.

## Projektstruktur

```text
src/
  komponenten/   wiederverwendbare Bausteine (ArtikelKarte, KiAntwort, KiTutor, QuizFrageKarte, …)
  seiten/        eine Komponente pro Route (Startseite, ArtikelDetail, Recherche, Quiz, NichtGefunden)
  hooks/         Custom Hooks: useFetch, useWikipedia, useKI
  typen/         Interfaces und Union Types (artikel, wikipedia, ki, quiz, tutor)
  daten/         die Wiki-Artikel
  utils/         Logik ohne Oberfläche: Suche, Validierung, fetchJSON, Wikipedia-Adressen, KI-Stream, Prompts, Quiz-Bewertung
  App.tsx        Seitenlayout und Routen
  main.tsx       Einstiegspunkt mit BrowserRouter
vite.config.ts   Proxy /api/ki zur Gemini-API
```

## Aufgabenverteilung

Die Arbeit wurde in Pakete geteilt. Jedes Paket entstand auf einem eigenen Feature-Branch und wurde
anschließend mit einem Merge-Commit in `main` übernommen, sodass im Git-Verlauf sichtbar bleibt, wer
woran gearbeitet hat. Idee, Funktionsumfang und Konventionen haben wir gemeinsam festgelegt.

| Paket | Branch | Inhalt | Person | Datum |
|---|---|---|---|---|
| 1 | `feature/projekt-setup` | Vite-Vorlage react-ts, strict-Modus, React Router, `.env.example` | Lorenz | 12.11. |
| 2 | `feature/datenmodell-startseite` | Datenmodell und Suche aus ESA 1 übernommen, Navigation, Layout, Startseite, 404-Seite | Lorenz | 13.11. |
| 3 | `feature/use-fetch-wikipedia` | Wikipedia-Typen, `fetchJSON`, Custom Hook `useFetch`, Ladeanimation, Fehlermeldung, Artikel zur Webentwicklung | Phillip | 14.11. |
| 4 | `feature/artikel-detail` | Detailseite `/artikel/:id` mit Wikipedia-Zusammenfassung, Artikel zu React | Phillip | 15.11. |
| 5 | `feature/ki-anbindung` | Vite-Proxy für Gemini, Streaming (`kiStream`), Custom Hook `useKI`, KI-Fehlermeldungen, Artikel zu KI und Tooling | Lorenz | 16.–17.11. |
| 7 | `feature/recherche` | Recherche-Seite mit validiertem Formular, Wikipedia-Volltextsuche, Auswahl eines Treffers | Phillip | 17.11. |
| 8 | `feature/ki-quiz` | KI-Quiz mit JSON-Ausgabe und Type Guards, Komponente `KiAntwort`, Auswertung mit Teilpunkten, KI-Erklärungen | Phillip | 18.11. |
| – | `feature/startseite-filter` | Alphabetische Sortierung und Kategorie-Filter auf der Startseite | Phillip | 18.11. |
| 6 | `feature/ki-tutor` | Hook `useWikipedia`, KI-Tutor mit vier Niveaus und eigenen Fragen, Meldung bei Tageslimit, `SubmitEvent` | Lorenz | 18.11. |
| 9 | `docs/readme` | Dokumentation | Lorenz | 18.11. |

Zusammenarbeit im Code: Lorenz' KI-Tutor verwendet Phillips Komponenten `KiAntwort` und
`WikipediaInfo`, Phillips Quiz baut auf Lorenz' Hook `useKI` auf. Am 17. und 18.11. liefen Branches
beider Personen parallel; die dabei entstandenen Merge-Konflikte in `daten/artikel.ts` und
`index.css` wurden gelöst, indem die Inhalte beider Branches übernommen wurden.

## KI-Einsatz

### KI in der Anwendung

| | |
|---|---|
| Anbieter und Modell | Google Gemini über die Gemini API, Standardmodell `gemini-3.5-flash`, umstellbar über `GEMINI_MODELL` (getestet auch mit `gemini-3.5-flash-lite`) |
| Funktionen | KI-Tutor (Erklärung nach Niveau, eigene Fragen), Erstellung der Quizfragen, Erklärungen zu falsch beantworteten Quizfragen |
| Gesendete Daten | Titel, Text, Stichwörter und Beispiel des Wiki-Artikels, die Wikipedia-Einleitung, das gewählte Niveau, die eigene Frage sowie bei Quiz-Erklärungen die Frage mit den angekreuzten Antworten. Es gibt kein Login; personenbezogene Daten werden nicht erhoben. |
| Umgang mit Eingaben | Im kostenlosen Tarif kann Google die Eingaben laut den Nutzungsbedingungen zur Verbesserung seiner Dienste verwenden. In das Fragefeld des Tutors sollten deshalb keine persönlichen Daten eingegeben werden. Die App selbst speichert keine Eingaben. |
| Prompts | dokumentiert im Code: `utils/tutor.ts` (Tutor), `utils/quiz.ts` (Quiz und Erklärungen) |

Umgesetzte Maßnahmen:

- **Schlüssel geschützt:** Der API-Schlüssel bleibt im Vite-Proxy und gelangt nicht in den Browser-Code.
- **Kennzeichnung:** Alle KI-Antworten tragen den Hinweis „KI-generierter Inhalt · kann Fehler enthalten“.
- **Weniger Halluzinationen:** Die KI bekommt Wiki-Artikel und Wikipedia-Text als Grundlage und die Anweisung, nichts zu erfinden.
- **Grenzen im System-Prompt:** nur IT-Fragen, keine Befolgung von Anweisungen, die die Regeln ändern sollen (Schutz vor Prompt-Injection).
- **Prüfung der Antworten:** Quizfragen kommen als JSON und werden mit Type Guards geprüft, ungültige Fragen werden aussortiert.
- **Bedienung:** Streaming mit Abbrechen, Eingaben mit Längenbegrenzung, verständliche Meldungen bei Überlastung (503) und Kontingent (429, Minuten- und Tageslimit).

### KI-Werkzeuge in der Entwicklung

| Person | Werkzeug | Wofür | Ergebnis |
|---|---|---|---|
| Lorenz | GitHub Copilot | Code-Vervollständigung im Editor | schnelleres Schreiben wiederkehrender Codeteile |
| Lorenz | Claude Opus 5.5 (Anthropic) | Hilfestellung bei Code, Strukturierung des Projekts und der Arbeitspakete, Problemstellungen, Erklärungen und Fehlersuche; Hilfestellung, Strukturierung und sprachliche Überarbeitung der README | Durch Nachhaken, Nachfragen und Verständnisfragen wurden Probleme schneller gelöst und Sicherheitslücken nicht übersehen. |
| Phillip | GitHub Copilot | Code-Vervollständigung sowie Hilfestellung bei Code, Strukturierung, Problemstellungen, Erklärungen und Fehlersuche | schnelleres Coden; schnelleres Bugfixing |
