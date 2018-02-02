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

## Installation
1. Repository als zip <a href="https://github.com/DanielEnglisch/FessieReborn/archive/master.zip">herunterladen</a>
2. Für die Verwendung wird das Softwarepaket <a href="https://www.apachefriends.org/de/index.html">XAMPP</a> empfohlen!
3. Die heruntergeladene zip in das htdocs Verzeichnis der XAMPP Installation extrahieren.  
    So sollte die Verzeichnisstruktur aussehen:  
    <img src="https://github.com/DanielEnglisch/FessieReborn/blob/master/docs/path.png"  style="width: 50px;"/>
4. Eine neue MySQL Datenbank erstellen. (http://localhost/phpmyadmin)
     <img src="https://github.com/DanielEnglisch/FessieReborn/blob/master/docs/createDB.png"  style="width: 50px;"/>
5. Die Datei 'levels.sql' in die zugewiesene Datenbank laden.
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
