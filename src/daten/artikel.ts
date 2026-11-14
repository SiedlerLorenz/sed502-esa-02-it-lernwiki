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
    titel: 'TCP und UDP',
    kategorie: 'Netzwerk',
    wikipediaTitel: 'Transmission_Control_Protocol',
    zusammenfassung:
      'TCP stellt eine Verbindung her und garantiert zuverlässige, geordnete Übertragung. UDP verzichtet darauf und ist dadurch schneller, aber ohne Zustellgarantie.',
    stichwoerter: ['Transportschicht', 'Verbindung', 'Zuverlässigkeit', 'Port'],
    beispiel: `ss -tuln   # lauschende TCP- (t) und UDP-Ports (u) unter Linux anzeigen`,
  },
  {
    id: 13,
    titel: 'DNS',
    kategorie: 'Netzwerk',
    wikipediaTitel: 'Domain_Name_System',
    zusammenfassung:
      'Das Domain Name System übersetzt Namen wie fernfh.ac.at in IP-Adressen, damit Rechner einander finden, ohne dass man Zahlenfolgen merken muss.',
    stichwoerter: ['Domain', 'IP-Adresse', 'Namensauflösung', 'Nameserver'],
    beispiel: `nslookup fernfh.ac.at   # fragt die IP-Adresse zu einem Namen ab`,
  },
  {
    id: 14,
    titel: 'HTTP und HTTPS',
    kategorie: 'Netzwerk',
    wikipediaTitel: 'Hypertext_Transfer_Protocol',
    zusammenfassung:
      'HTTP regelt, wie ein Client Ressourcen von einem Server anfragt. HTTPS ist HTTP über eine mit TLS verschlüsselte Verbindung.',
    stichwoerter: ['Request', 'Response', 'TLS', 'Verschlüsselung', 'Statuscode'],
    beispiel: `curl -I https://example.org   # zeigt nur Statuszeile und Header der Antwort`,
  },
  {
    id: 15,
    titel: 'IP-Adressen und Subnetze',
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
    titel: 'REST-API',
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
    titel: 'JSON',
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
    titel: 'HTTP-Statuscodes',
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
    titel: 'CORS',
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
    titel: 'Promise und async/await',
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
];
