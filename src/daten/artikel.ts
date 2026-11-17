import type { Artikel } from '../typen/artikel.ts';

// Die 15 Wiki-Einträge aus ESA 1, ergänzt um den passenden Wikipedia-Titel
export const artikelListe: Artikel[] = [
  {
    id: 1,
    titel: 'JavaScript',
    kategorie: 'Programmiersprachen',
    wikipediaTitel: 'JavaScript',
    zusammenfassung:
      'Die Skriptsprache des Webs. Sie läuft in jedem Browser und dank Node.js auch außerhalb davon, zum Beispiel für Server und Build-Werkzeuge.',
    stichwoerter: ['Browser', 'Node.js', 'DOM', 'dynamisch typisiert'],
    beispiel: `console.log('Hello, World!');`,
  },
  {
    id: 2,
    titel: 'TypeScript',
    kategorie: 'Programmiersprachen',
    wikipediaTitel: 'TypeScript',
    zusammenfassung:
      'JavaScript mit statischem Typsystem. Der Compiler prüft die Typen vor der Ausführung und übersetzt den Code anschließend in reines JavaScript.',
    stichwoerter: ['Typen', 'Interface', 'Compiler', 'JavaScript'],
    beispiel: `const gruss: string = 'Hello, World!';
console.log(gruss);`,
  },
  {
    id: 3,
    titel: 'Python',
    kategorie: 'Programmiersprachen',
    wikipediaTitel: 'Python_(Programmiersprache)',
    zusammenfassung:
      'Eine interpretierte Allzwecksprache mit gut lesbarer Syntax. Blöcke werden durch Einrückung statt durch geschweifte Klammern gebildet.',
    stichwoerter: ['Skripting', 'Einrückung', 'Interpreter', 'Datenanalyse'],
    beispiel: `print("Hello, World!")`,
  },
  {
    id: 4,
    titel: 'Rust',
    kategorie: 'Programmiersprachen',
    wikipediaTitel: 'Rust_(Programmiersprache)',
    zusammenfassung:
      'Eine kompilierte Systemsprache. Über das Ownership-Konzept prüft der Compiler die Speichersicherheit, ohne dass ein Garbage Collector nötig ist.',
    stichwoerter: ['Ownership', 'Systemprogrammierung', 'Compiler', 'Speichersicherheit'],
    beispiel: `fn main() {
    println!("Hello, World!");
}`,
  },
  {
    id: 5,
    titel: 'Linux: Kernel und Distribution',
    kategorie: 'Linux',
    wikipediaTitel: 'Linux-Distribution',
    zusammenfassung:
      'Linux bezeichnet genau genommen nur den Kernel. Eine Distribution wie Debian, Ubuntu oder Fedora bündelt ihn mit Systemwerkzeugen, Paketverwaltung und Software.',
    stichwoerter: ['Kernel', 'Distribution', 'Debian', 'Ubuntu', 'Open Source'],
    beispiel: `uname -r             # Version des Kernels
cat /etc/os-release  # Name und Version der Distribution`,
  },
  {
    id: 6,
    titel: 'Linux: Dateirechte',
    kategorie: 'Linux',
    wikipediaTitel: 'Unix-Dateirechte',
    zusammenfassung:
      'Jede Datei hat Rechte für Besitzer, Gruppe und alle anderen, jeweils für Lesen (r), Schreiben (w) und Ausführen (x). Mit chmod werden sie geändert, etwa chmod 755 datei.',
    stichwoerter: ['chmod', 'rwx', 'Besitzer', 'Gruppe', 'Berechtigung'],
    beispiel: `chmod 755 skript.sh  # Besitzer: rwx, Gruppe und andere: r-x
ls -l skript.sh      # Rechte anzeigen`,
  },
  {
    id: 7,
    titel: 'Linux: Paketmanager',
    kategorie: 'Linux',
    wikipediaTitel: 'Paketverwaltung',
    zusammenfassung:
      'Paketmanager installieren, aktualisieren und entfernen Software samt Abhängigkeiten. Unter Debian und Ubuntu heißt er apt, unter Fedora dnf.',
    stichwoerter: ['apt', 'dnf', 'Installation', 'Abhängigkeiten'],
    beispiel: `# Debian / Ubuntu
sudo apt update
sudo apt install git

# Fedora
sudo dnf install git`,
  },
  {
    id: 8,
    titel: 'Linux: Shell-Grundbefehle',
    kategorie: 'Linux',
    wikipediaTitel: 'Unix-Shell',
    zusammenfassung:
      'Mit pwd zeigt man das aktuelle Verzeichnis, mit ls den Inhalt, mit cd wechselt man das Verzeichnis und mit grep durchsucht man Text nach Mustern.',
    stichwoerter: ['Terminal', 'ls', 'cd', 'grep', 'bash'],
    beispiel: `pwd                          # aktuelles Verzeichnis
ls -l                        # Inhalt als Liste
cd /tmp                      # Verzeichnis wechseln
grep -i "fehler" log.txt     # Text suchen (ohne Groß-/Kleinschreibung)`,
  },
  {
    id: 9,
    titel: 'Git: Commit',
    kategorie: 'Git',
    wikipediaTitel: 'Commit',
    zusammenfassung:
      'Ein Commit speichert den Stand der vorgemerkten Änderungen zusammen mit einer Beschreibung. Die Verlaufskette der Commits bildet die Historie des Projekts.',
    stichwoerter: ['commit', 'Historie', 'Commit-Message', 'Versionskontrolle'],
    beispiel: `git commit -m "Add: Login-Seite"
git log --oneline    # Verlauf kompakt anzeigen`,
  },
  {
    id: 10,
    titel: 'Git: Staging Area',
    kategorie: 'Git',
    wikipediaTitel: 'Git',
    zusammenfassung:
      'Mit git add werden Änderungen für den nächsten Commit vorgemerkt. So lässt sich genau steuern, welche Änderungen in einen Commit gehören.',
    stichwoerter: ['git add', 'Index', 'Vormerken', 'commit'],
    beispiel: `git add index.html   # eine Datei vormerken
git status           # zeigt, was vorgemerkt ist`,
  },
  {
    id: 11,
    titel: 'Git: Branch und Merge',
    kategorie: 'Git',
    wikipediaTitel: 'Versionsverwaltung',
    zusammenfassung:
      'Ein Branch ist ein beweglicher Zeiger auf einen Commit und erlaubt paralleles Arbeiten an Features. Mit git merge werden die Änderungen wieder zusammengeführt.',
    stichwoerter: ['branch', 'merge', 'Feature', 'Zusammenführen'],
    beispiel: `git switch -c feature/login   # neuen Branch anlegen und wechseln
git switch main
git merge feature/login       # Änderungen in main übernehmen`,
  },
  {
    id: 12,
    titel: 'Netzwerk: TCP und UDP',
    kategorie: 'Netzwerk',
    wikipediaTitel: 'Transmission_Control_Protocol',
    zusammenfassung:
      'TCP stellt eine Verbindung her und garantiert zuverlässige, geordnete Übertragung. UDP verzichtet darauf und ist dadurch schneller, aber ohne Zustellgarantie.',
    stichwoerter: ['Transportschicht', 'Verbindung', 'Zuverlässigkeit', 'Port'],
    beispiel: `ss -tuln   # lauschende TCP- (t) und UDP-Ports (u) unter Linux anzeigen`,
  },
  {
    id: 13,
    titel: 'Netzwerk: DNS',
    kategorie: 'Netzwerk',
    wikipediaTitel: 'Domain_Name_System',
    zusammenfassung:
      'Das Domain Name System übersetzt Namen wie fernfh.ac.at in IP-Adressen, damit Rechner einander finden, ohne dass man Zahlenfolgen merken muss.',
    stichwoerter: ['Domain', 'IP-Adresse', 'Namensauflösung', 'Nameserver'],
    beispiel: `nslookup fernfh.ac.at   # fragt die IP-Adresse zu einem Namen ab`,
  },
  {
    id: 14,
    titel: 'Netzwerk: HTTP und HTTPS',
    kategorie: 'Netzwerk',
    wikipediaTitel: 'Hypertext_Transfer_Protocol',
    zusammenfassung:
      'HTTP regelt, wie ein Client Ressourcen von einem Server anfragt. HTTPS ist HTTP über eine mit TLS verschlüsselte Verbindung.',
    stichwoerter: ['Request', 'Response', 'TLS', 'Verschlüsselung', 'Statuscode'],
    beispiel: `curl -I https://example.org   # zeigt nur Statuszeile und Header der Antwort`,
  },
  {
    id: 15,
    titel: 'Netzwerk: IP-Adressen und Subnetze',
    kategorie: 'Netzwerk',
    wikipediaTitel: 'Subnetz',
    zusammenfassung:
      'Eine IPv4-Adresse besteht aus 32 Bit. Die Subnetzmaske legt fest, welcher Teil das Netz bezeichnet; bei /24 sind 254 Adressen für Geräte nutzbar.',
    stichwoerter: ['IPv4', 'Subnetzmaske', 'CIDR', 'Netzwerk'],
    beispiel: `192.168.1.0/24 entspricht der Maske 255.255.255.0
nutzbare Adressen: 192.168.1.1 bis 192.168.1.254`,
  },
  {
    id: 16,
    titel: 'Web: REST-API',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'Representational_State_Transfer',
    zusammenfassung:
      'Eine REST-API stellt Daten über normale Web-Adressen bereit. Jede Ressource hat eine eigene URL, und die HTTP-Methode sagt, was passieren soll: GET liest, POST legt an, PUT ändert, DELETE löscht.',
    stichwoerter: ['API', 'Schnittstelle', 'GET', 'POST', 'Endpunkt', 'URL'],
    beispiel: `GET https://de.wikipedia.org/api/rest_v1/page/summary/Git
→ liefert die Zusammenfassung des Wikipedia-Artikels "Git" als JSON`,
  },
  {
    id: 17,
    titel: 'Web: JSON',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'JSON',
    zusammenfassung:
      'JSON (JavaScript Object Notation) ist ein Textformat für den Datenaustausch. Es kennt Objekte, Listen, Texte, Zahlen, true/false und null und wird von fast allen Web-APIs verwendet.',
    stichwoerter: ['Datenformat', 'Objekt', 'Datenaustausch', 'parse', 'stringify'],
    beispiel: `const text = '{"titel": "Git", "seiten": 42}';
const objekt = JSON.parse(text);   // Text → Objekt
console.log(objekt.titel);         // "Git"
JSON.stringify(objekt);            // Objekt → Text`,
  },
  {
    id: 18,
    titel: 'Web: HTTP-Statuscodes',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'HTTP-Statuscode',
    zusammenfassung:
      'Jede HTTP-Antwort enthält einen dreistelligen Statuscode. 2xx bedeutet Erfolg, 4xx einen Fehler der Anfrage (etwa 404 nicht gefunden oder 429 zu viele Anfragen) und 5xx einen Fehler des Servers.',
    stichwoerter: ['200', '404', '429', '500', 'Fehler', 'Antwort'],
    beispiel: `200 OK                  Anfrage erfolgreich
404 Not Found           Ressource existiert nicht
429 Too Many Requests   zu viele Anfragen in kurzer Zeit
500 Internal Error      Fehler auf dem Server`,
  },
  {
    id: 19,
    titel: 'Web: CORS',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'Cross-Origin_Resource_Sharing',
    zusammenfassung:
      'Browser erlauben Anfragen an fremde Domains nur, wenn der Server es per Header freigibt. Fehlt der Header Access-Control-Allow-Origin, blockiert der Browser die Antwort, auch wenn der Server sie geschickt hat.',
    stichwoerter: ['Cross-Origin', 'Header', 'Browser', 'Sicherheit', 'Same-Origin-Policy'],
    beispiel: `Access-Control-Allow-Origin: *
→ jede Webseite darf die Antwort lesen (z. B. bei der Wikipedia-API)`,
  },
  {
    id: 20,
    titel: 'JavaScript: Promise und async/await',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'Future_(Programmierung)',
    zusammenfassung:
      'Ein Promise ist ein Platzhalter für ein Ergebnis, das erst später feststeht, etwa die Antwort eines Servers. Mit await wartet eine async-Funktion auf das Ergebnis, ohne den Browser zu blockieren.',
    stichwoerter: ['asynchron', 'await', 'fetch', 'try', 'catch'],
    beispiel: `async function ladeArtikel(): Promise<void> {
  try {
    const antwort = await fetch('/api/artikel');
    const daten = await antwort.json();
    console.log(daten);
  } catch (fehler) {
    console.error('Laden fehlgeschlagen', fehler);
  }
}`,
  },
  {
    id: 21,
    titel: 'TypeScript: Generics',
    kategorie: 'Programmiersprachen',
    wikipediaTitel: 'Generische_Programmierung',
    zusammenfassung:
      'Generics sind Typparameter, die erst beim Aufruf festgelegt werden. So funktioniert eine Funktion für viele Datentypen und bleibt trotzdem typsicher, ohne auf any auszuweichen.',
    stichwoerter: ['Typparameter', 'TypeScript', 'wiederverwendbar', 'any'],
    beispiel: `function ersterEintrag<T>(liste: T[]): T | undefined {
  return liste[0];
}
const zahl = ersterEintrag<number>([3, 7]);   // Typ: number | undefined`,
  },
  {
    id: 22,
    titel: 'React: Komponenten',
    kategorie: 'React',
    wikipediaTitel: 'React',
    zusammenfassung:
      'Eine Komponente ist eine Funktion, die einen Teil der Oberfläche zurückgibt. Komponenten werden wie Bausteine zusammengesetzt, etwa Navigation, Artikelkarte und Seite.',
    stichwoerter: ['Komponente', 'JSX', 'Funktion', 'Baustein', 'tsx'],
    beispiel: `function Begruessung(): React.JSX.Element {
  return <h1>Willkommen im IT-Lernwiki</h1>;
}

// Verwendung wie ein HTML-Element:
<Begruessung />`,
  },
  {
    id: 23,
    titel: 'React: Props',
    kategorie: 'React',
    wikipediaTitel: 'Parameter_(Informatik)',
    zusammenfassung:
      'Props sind die Eingabewerte einer Komponente, vergleichbar mit Funktionsparametern. Sie fließen von der Eltern- zur Kindkomponente und werden in TypeScript mit einem Interface beschrieben.',
    stichwoerter: ['Props', 'Interface', 'Eltern', 'Kind', 'Parameter'],
    beispiel: `interface ArtikelKarteProps {
  artikel: Artikel;
}

function ArtikelKarte({ artikel }: ArtikelKarteProps): React.JSX.Element {
  return <h3>{artikel.titel}</h3>;
}

<ArtikelKarte artikel={artikelListe[0]} />`,
  },
  {
    id: 24,
    titel: 'React: State und useState',
    kategorie: 'React',
    wikipediaTitel: 'Reaktive_Programmierung',
    zusammenfassung:
      'State ist das Gedächtnis einer Komponente. Wird er mit der Setter-Funktion geändert, rendert React die Komponente neu und die Oberfläche passt sich automatisch an.',
    stichwoerter: ['State', 'useState', 'Hook', 'Rendern', 'Setter'],
    beispiel: `const [suchbegriff, setSuchbegriff] = useState<string>('');

<input
  value={suchbegriff}
  onChange={(e) => setSuchbegriff(e.target.value)}
/>`,
  },
  {
    id: 25,
    titel: 'React: useEffect',
    kategorie: 'React',
    wikipediaTitel: 'Wirkung_(Informatik)',
    zusammenfassung:
      'useEffect führt Nebenwirkungen aus, etwa Daten laden oder das Fenster scrollen. Das Abhängigkeits-Array legt fest, wann der Effekt erneut läuft, die Cleanup-Funktion räumt vorher auf.',
    stichwoerter: ['useEffect', 'Abhängigkeiten', 'Cleanup', 'Nebenwirkung', 'Hook'],
    beispiel: `const { pathname } = useLocation();

useEffect(() => {
  window.scrollTo(0, 0);   // läuft bei jedem Seitenwechsel
}, [pathname]);`,
  },
  {
    id: 26,
    titel: 'React: Custom Hooks',
    kategorie: 'React',
    wikipediaTitel: 'Hook_(Informatik)',
    zusammenfassung:
      'Ein Custom Hook ist eine eigene Funktion, deren Name mit use beginnt und die andere Hooks nutzt. So lässt sich Logik wie das Laden von Daten in mehreren Komponenten wiederverwenden.',
    stichwoerter: ['Custom Hook', 'useFetch', 'wiederverwendbar', 'Logik', 'Hook'],
    beispiel: `const { daten, isLaden, fehler, neuLaden } =
  useFetch<WikipediaZusammenfassung>(url);

if (isLaden) return <Ladeanimation />;
if (fehler !== null) return <FehlerMeldung nachricht={fehler} />;`,
  },
  {
    id: 27,
    titel: 'KI: Large Language Model',
    kategorie: 'Künstliche Intelligenz',
    wikipediaTitel: 'Large_Language_Model',
    zusammenfassung:
      'Ein Large Language Model (LLM) ist ein mit sehr vielen Texten trainiertes Sprachmodell. Es sagt Wort für Wort voraus, wie ein Text weitergeht, und kann so Fragen beantworten oder Inhalte erklären. Antworten können trotzdem falsch sein.',
    stichwoerter: ['LLM', 'Sprachmodell', 'Gemini', 'Token', 'Halluzination'],
    beispiel: `Frage:   "Was ist ein Commit?"
Modell:  "Ein" → "Commit" → "ist" → "ein" → "gespeicherter" → …
         (jedes Wort wird aus den vorherigen vorhergesagt)`,
  },
  {
    id: 28,
    titel: 'KI: API-Schlüssel und .env',
    kategorie: 'Künstliche Intelligenz',
    wikipediaTitel: 'Umgebungsvariable',
    zusammenfassung:
      'Ein API-Schlüssel weist eine Anwendung gegenüber einem Dienst aus und ist so geheim wie ein Passwort. Er gehört in eine .env-Datei, die über .gitignore nie ins Repository gelangt, und sollte nur auf einem Server verwendet werden.',
    stichwoerter: ['API-Schlüssel', '.env', '.gitignore', 'Umgebungsvariable', 'Sicherheit'],
    beispiel: `# .env (wird nicht committet)
GEMINI_API_KEY=dein-schlüssel

# .gitignore
.env`,
  },
  {
    id: 29,
    titel: 'KI: Streaming',
    kategorie: 'Künstliche Intelligenz',
    wikipediaTitel: 'Streaming_Media',
    zusammenfassung:
      'Beim Streaming liefert der Server die Antwort in vielen kleinen Teilen, während sie noch entsteht. Die Oberfläche zeigt den Text sofort an, statt auf die vollständige Antwort zu warten.',
    stichwoerter: ['Streaming', 'Server-Sent Events', 'getReader', 'Echtzeit'],
    beispiel: `const leser = antwort.body.getReader();
while (true) {
  const { done, value } = await leser.read();
  if (done) break;
  text += decoder.decode(value, { stream: true });
}`,
  },
  {
    id: 30,
    titel: 'KI: Prompt und System-Prompt',
    kategorie: 'Künstliche Intelligenz',
    wikipediaTitel: 'Prompt-Engineering',
    zusammenfassung:
      'Der Prompt ist die Eingabe an ein Sprachmodell. Der System-Prompt legt vorab Rolle, Aufgabe, Format und Grenzen fest. Je genauer er formuliert ist, desto verlässlicher passt die Antwort zur Anwendung.',
    stichwoerter: ['Prompt', 'System-Prompt', 'Rolle', 'Anweisung', 'Temperatur'],
    beispiel: `Rolle:     Du bist ein geduldiger IT-Tutor.
Aufgabe:   Erkläre den folgenden Wiki-Artikel.
Format:    Höchstens 150 Wörter, auf Deutsch.
Grenzen:   Erfinde keine Fakten, die nicht im Artikel stehen.`,
  },
  {
    id: 31,
    titel: 'Tooling: Vite',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'Vite_(Software)',
    zusammenfassung:
      'Vite ist Build-Werkzeug und Entwicklungsserver in einem. Im Entwicklungsmodus zeigt es Änderungen sofort im Browser an, für die Veröffentlichung bündelt und verkleinert es den Code im Ordner dist.',
    stichwoerter: ['Vite', 'Build', 'Entwicklungsserver', 'Proxy', 'dist'],
    beispiel: `npm create vite@latest mein-projekt -- --template react-ts
npm run dev       # Entwicklungsserver auf http://localhost:5173
npm run build     # Typprüfung und Produktions-Build nach dist/
npm run preview   # gebauten Stand lokal ansehen`,
  },
  {
    id: 32,
    titel: 'Tooling: npm und Node.js',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'Npm_(Software)',
    zusammenfassung:
      'Node.js führt JavaScript außerhalb des Browsers aus und treibt die Entwicklungswerkzeuge an. Der mitgelieferte Paketmanager npm installiert Bibliotheken; welche ein Projekt braucht, steht in der package.json.',
    stichwoerter: ['npm', 'Node.js', 'package.json', 'node_modules', 'Paketmanager'],
    beispiel: `node -v                          # installierte Node.js-Version
npm install                      # alle Pakete aus package.json installieren
npm install react-router-dom     # neues Paket hinzufügen`,
  },
  {
    id: 33,
    titel: 'Tooling: Linter',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'Lint_(Programmierwerkzeug)',
    zusammenfassung:
      'Ein Linter prüft den Quellcode, ohne ihn auszuführen, und warnt vor typischen Fehlerquellen und unsauberem Stil. Im Projekt übernimmt das oxlint, unter anderem mit Regeln für React-Hooks.',
    stichwoerter: ['Linter', 'oxlint', 'statische Analyse', 'Warnung', 'Codequalität'],
    beispiel: `npm run lint

warning react(set-state-in-effect): Calling setState synchronously
within an effect can trigger cascading renders`,
  },
  {
    id: 34,
    titel: 'React: useRef',
    kategorie: 'React',
    wikipediaTitel: 'Referenz_(Programmierung)',
    zusammenfassung:
      'useRef speichert einen Wert über mehrere Renderdurchläufe hinweg, ohne dass eine Änderung neu rendert. Das eignet sich für Werte, die nicht angezeigt werden, etwa einen AbortController oder ein DOM-Element.',
    stichwoerter: ['useRef', 'Referenz', 'current', 'AbortController', 'Hook'],
    beispiel: `const controllerRef = useRef<AbortController | null>(null);

controllerRef.current = new AbortController();   // kein neues Rendern
controllerRef.current?.abort();                  // laufende Anfrage stoppen`,
  },
  {
    id: 35,
    titel: 'React: useCallback',
    kategorie: 'React',
    wikipediaTitel: 'Memoisation',
    zusammenfassung:
      'useCallback merkt sich eine Funktion und erzeugt sie nur neu, wenn sich ein Wert im Abhängigkeits-Array ändert. So bleibt die Funktion zwischen Renderdurchläufen gleich, etwa wenn sie an Kindkomponenten weitergegeben wird.',
    stichwoerter: ['useCallback', 'Memoisation', 'Abhängigkeiten', 'Funktion', 'Hook'],
    beispiel: `const abbrechen = useCallback((): void => {
  controllerRef.current?.abort();
}, []);   // leeres Array: Funktion wird nur einmal erzeugt`,
  },
  {
    id: 36,
    titel: 'React: Formulare und Validierung',
    kategorie: 'React',
    wikipediaTitel: 'Webformular',
    zusammenfassung:
      'In React steht der Inhalt eines Eingabefelds im State (kontrolliertes Formular). Beim Absenden wird die Eingabe geprüft; ist sie ungültig, erscheint eine Fehlermeldung und die Aktion wird nicht ausgeführt.',
    stichwoerter: ['Formular', 'Validierung', 'onSubmit', 'preventDefault', 'Fehlermeldung'],
    beispiel: `const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();               // Seite nicht neu laden
  const meldung = pruefeSuchbegriff(eingabe);
  setFehler(meldung);
  if (meldung === null) onSuchen(eingabe.trim());
};`,
  },
  {
    id: 37,
    titel: 'React: URL-Parameter mit useSearchParams',
    kategorie: 'React',
    wikipediaTitel: 'Query-String',
    zusammenfassung:
      'Query-Parameter stehen in der Adresse nach dem Fragezeichen, etwa ?q=docker. Mit useSearchParams aus React Router lassen sie sich lesen und setzen; so kann man Suchergebnisse teilen und der Zurück-Button funktioniert.',
    stichwoerter: ['useSearchParams', 'Query-String', 'URL', 'React Router', 'Zurück-Button'],
    beispiel: `const [suchParameter, setSuchParameter] = useSearchParams();
const suchbegriff = suchParameter.get('q') ?? '';

setSuchParameter({ q: 'docker' });   // Adresse wird zu /recherche?q=docker`,
  },
  {
    id: 38,
    titel: 'Web: Barrierefreiheit mit ARIA',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'Accessible_Rich_Internet_Applications',
    zusammenfassung:
      'ARIA-Attribute geben Screenreadern zusätzliche Informationen, die im HTML allein fehlen: ob ein Feld ungültig ist, welche Meldung dazugehört oder ob sich ein Bereich gerade aktualisiert.',
    stichwoerter: ['ARIA', 'Barrierefreiheit', 'Screenreader', 'aria-invalid', 'role'],
    beispiel: `<input
  aria-invalid={fehler !== null}
  aria-describedby="recherche-fehler"
/>
<p id="recherche-fehler" role="alert">Bitte einen Suchbegriff eingeben.</p>`,
  },
  {
    id: 39,
    titel: 'Web: Cross-Site-Scripting (XSS)',
    kategorie: 'Webentwicklung',
    wikipediaTitel: 'Cross-Site-Scripting',
    zusammenfassung:
      'Bei Cross-Site-Scripting wird fremder Code über ungeprüfte Inhalte in eine Webseite eingeschleust. Schutz bietet, fremde Texte nie als HTML einzufügen; React stellt Inhalte in geschweiften Klammern automatisch als reinen Text dar.',
    stichwoerter: ['XSS', 'Sicherheit', 'HTML', 'dangerouslySetInnerHTML', 'DOMParser'],
    beispiel: `// unsicher: fremdes HTML wird ausgeführt
<p dangerouslySetInnerHTML={{ __html: treffer.excerpt }} />

// sicher: nur der reine Text wird angezeigt
<p>{entferneHtml(treffer.excerpt)}</p>`,
  },
];
