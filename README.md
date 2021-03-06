# WDP Projekt von Englisch Daniel (S1610307056)

* Projekt-Name: FessieReborn
* Projekt-Typ: Game
* Gruppenprojekt: Nein
* Externe JS/CSS Bibliotheken: Nein
* Zeitaufwand (h): 50-60

# FessieReborn
Ein web-basiertes oldschool Spiel basierend auf "Fessie räumt auf".  

## Features
* Spannende vordefinierte Levels
* Lokal gespeichertes Scoreboard
* Möglichkeit eigene Levels zu entwerfen
* Teile deine Levels mit Freunden
  
    <img src="https://github.com/DanielEnglisch/FessieReborn/blob/master/docs/screenshot.png"  style="width: 200px;"/>

## Installation mit Docker

1. Mit einer Eingabeaufforderung in das Projektverzeichnis navigieren.
2. Den Befehl `docker-compose up` ausführen oder die Datei `run.ps1` mit der Windows Powershell ausführen.
3. Fessie unter `http://localhost/` spielen.
4. Optional kann die Datenbank unter `http://localhost:8080/` modifiert werden.
5. Zum Beenden von docker `Strg-C` in der Eingabeaufforderung drücken.
	
## Installation ohne Docker
1. Repository als zip <a href="https://github.com/DanielEnglisch/FessieReborn/archive/master.zip">herunterladen</a>
2. Für die Verwendung wird das Softwarepaket <a href="https://www.apachefriends.org/de/index.html">XAMPP</a> empfohlen!
3. Die heruntergeladene zip in das htdocs Verzeichnis der XAMPP Installation extrahieren.  
    So sollte die Verzeichnisstruktur aussehen:  
    <img src="https://github.com/DanielEnglisch/FessieReborn/blob/master/docs/path.png"  style="width: 50px;"/>
4. Eine neue MySQL Datenbank erstellen. (http://localhost/phpmyadmin)
     <img src="https://github.com/DanielEnglisch/FessieReborn/blob/master/docs/createDB.png"  style="width: 50px;"/>
5. Die Datei 'sql/levels.sql' in die zugewiesene Datenbank laden.
    <img src="https://github.com/DanielEnglisch/FessieReborn/blob/master/docs/importLevels.png"  style="width: 50px;"/>  
     Fertig geladene Datenbank:  
    <img src="https://github.com/DanielEnglisch/FessieReborn/blob/master/docs/levels.png"  style="width: 50px;"/>
 
6. In der Datei 'connection.php' die Zugangsdaten der MySql Datenbank eintragen.  
Standardzugangsdaten für MySQL in XAMPP (Benutzer 'root' ohne Passwort)

```php
$conf['host'] = 'localhost';
$conf['database'] = 'fessie';
$conf['user'] = 'root';
$conf['passwd'] = '';
```

7. Auf die Addresse <a href="http://localhost/fessie/">http://localhost/fessie/</a> gehen und spielen.

## Weiterentwickeln (mit Docker und Gulp)
Zum Weiterentwickeln von FessieReborn muss zunächst `npm` installiert sein und die Pakete mit `npm install` heruntergeladen werden. Nach dem Starten des Webservers mit `docker-compose up --build` muss der Befehl `gulp` ausgeführt werden. Nun werden alle Änderungen der Dateien in `src/` automatisch erkannt und die Anwendung neu kompiliert. Die Seite muss danach mit `F5` neu geladen werden.
