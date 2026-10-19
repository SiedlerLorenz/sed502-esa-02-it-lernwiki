// Mögliche Kategorien des Wikis (Union Type: nur diese vier Werte sind erlaubt)
export type Kategorie = 'Programmiersprachen' | 'Linux' | 'Git' | 'Netzwerk';

// Beschreibt die Datenstruktur eines Wiki-Artikels
export interface Artikel {
  readonly id: number; // readonly: nach dem Anlegen nicht mehr änderbar
  titel: string;
  kategorie: Kategorie;
  zusammenfassung: string;
  stichwoerter: string[];
  beispiel?: string; // optional: Code-Snippet oder Befehle zum Artikel
}

export const artikelListe: Artikel[] = [
  {
    id: 1,
    titel: 'JavaScript',
    kategorie: 'Programmiersprachen',
    zusammenfassung:
      'Die Skriptsprache des Webs. Sie läuft in jedem Browser und dank Node.js auch außerhalb davon, zum Beispiel für Server und Build-Werkzeuge.',
    stichwoerter: ['Browser', 'Node.js', 'DOM', 'dynamisch typisiert'],
    beispiel: `console.log('Hello, World!');`,
  },
  {
    id: 2,
    titel: 'TypeScript',
    kategorie: 'Programmiersprachen',
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
    zusammenfassung:
      'Eine interpretierte Allzwecksprache mit gut lesbarer Syntax. Blöcke werden durch Einrückung statt durch geschweifte Klammern gebildet.',
    stichwoerter: ['Skripting', 'Einrückung', 'Interpreter', 'Datenanalyse'],
    beispiel: `print("Hello, World!")`,
  },
  {
    id: 4,
    titel: 'Rust',
    kategorie: 'Programmiersprachen',
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
    zusammenfassung:
      'TCP stellt eine Verbindung her und garantiert zuverlässige, geordnete Übertragung. UDP verzichtet darauf und ist dadurch schneller, aber ohne Zustellgarantie.',
    stichwoerter: ['Transportschicht', 'Verbindung', 'Zuverlässigkeit', 'Port'],
    beispiel: `ss -tuln   # lauschende TCP- (t) und UDP-Ports (u) unter Linux anzeigen`,
  },
  {
    id: 13,
    titel: 'DNS',
    kategorie: 'Netzwerk',
    zusammenfassung:
      'Das Domain Name System übersetzt Namen wie fernfh.ac.at in IP-Adressen, damit Rechner einander finden, ohne dass man Zahlenfolgen merken muss.',
    stichwoerter: ['Domain', 'IP-Adresse', 'Namensauflösung', 'Nameserver'],
    beispiel: `nslookup fernfh.ac.at   # fragt die IP-Adresse zu einem Namen ab`,
  },
  {
    id: 14,
    titel: 'HTTP und HTTPS',
    kategorie: 'Netzwerk',
    zusammenfassung:
      'HTTP regelt, wie ein Client Ressourcen von einem Server anfragt. HTTPS ist HTTP über eine mit TLS verschlüsselte Verbindung.',
    stichwoerter: ['Request', 'Response', 'TLS', 'Verschlüsselung', 'Statuscode'],
    beispiel: `curl -I https://example.org   # zeigt nur Statuszeile und Header der Antwort`,
  },
  {
    id: 15,
    titel: 'IP-Adressen und Subnetze',
    kategorie: 'Netzwerk',
    zusammenfassung:
      'Eine IPv4-Adresse besteht aus 32 Bit. Die Subnetzmaske legt fest, welcher Teil das Netz bezeichnet; bei /24 sind 254 Adressen für Geräte nutzbar.',
    stichwoerter: ['IPv4', 'Subnetzmaske', 'CIDR', 'Netzwerk'],
    beispiel: `192.168.1.0/24 entspricht der Maske 255.255.255.0
nutzbare Adressen: 192.168.1.1 bis 192.168.1.254`,
  },
];
