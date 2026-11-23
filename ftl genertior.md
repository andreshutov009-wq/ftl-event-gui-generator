# **FTL Event GUI Generator – Komplette Gesamtzusammenfassung**

## **1\. Fehler-Handling, Code-Qualität & Bestandschutz**

* **Exakte Fehlerbeschreibungen:** Bei jedem Problem oder Error immer direkt und präzise benennen, was genau das Problem ist (z. B. welcher Tag nicht passt, warum kein Event erkannt wurde oder was der Parser meldet), statt nur allgemeine Fehlermeldungen auszugeben.  
* **Im Code verankern:** Dieses genaue Fehler-Handling gilt genauso auch im Code selbst (z. B. bei Parser-Fehlern, Checks, Validierungen und Rückmeldungen in der Oberfläche).  
* **Funktionierendes behalten:** Features, die bereits funktionieren – wie Hochladen sowie das Hoch- und Runterladen von .xml.append (und .ftl / .xml) –, dürfen nicht einfach entfernt werden.  
* **Checkliste für Neuaufbau / Hänger:** Falls mal etwas neu gebaut werden muss oder unklar ist, dient diese Zusammenfassung als vollständige Checkliste, damit nichts verloren geht.

## **2\. Wiederaufnahme anhand einer hochgeladenen HTML-Datei**

* **Ausgangsbasis:** Wenn du eine bisherige HTML-Datei hochlädst, dient genau diese Datei als Grundlage für Struktur, bestehende Logik, IDs und neue Erweiterungen – nichts Funktionierendes wird dabei versehentlich überschrieben.  
* **Gezielte Erweiterung:** Neue Features setzen direkt auf dem Stand der hochgeladenen HTML auf. Unklarheiten oder Fehler darin werden offen und genau angesprochen.

## **3\. Import, Export, Mod-Trennung, Schiffs-Editor & Übersicht**

* **Import & Export:** Bestehende .xml-, .xml.append-, .ftl- und .zip-Dateien einlesen, Events und Schiffs-Blueprints bearbeiten und als .ftl-Archiv (data/events.xml.append, data/blueprints.xml.append, mod-appendix/metadata.xml) bzw. XML ausgeben.  
* **Mehrere Mods namentlich und räumlich trennen:** Wenn mehrere Mods geladen werden, bekommen sie eigene, klar voneinander abgegrenzte Blöcke/Bereiche mit Namen/Kennzeichnung, sodass sofort erkennbar ist, welche Sektoren und Events zu welcher Mod gehören.  
* **Nach Sektor kategorisieren:** Innerhalb der jeweiligen Mod-Bereiche lassen sich XML-Einträge und IDs nach Sektor bündeln, um Platz zu sparen und einen besseren Überblick zu behalten.  
* **Sektorangabe & ID-Eingabe trennen:** Eigene Felder für Sektor und ID nutzen, damit Sektoren und IDs sauber getrennt bleiben und leichter organisiert werden können.  
* **Gegner-Schiff & Schiff-Editor:** Beim Gegner-Schiff (\<ship load="..."\>) Vorschläge/Dropdown nutzen und geladene Schiff-Dateien (inkl. Superluminal-2- / SL2-Strukturen) lesbar und bearbeitbar machen – inklusive Waffen und später auch Crew/Besatzung.

## **4\. Freie Namen, Vorschläge, Sprite-Kategorisierung & Achievements**

* **Eigene Namen direkt in Vorschlägen:** Neue Namen/IDs, die du für Event-Kategorien, Sektoren, Waffen, Drohnen oder Augments eintippst, wandern automatisch in die jeweiligen Vorschlagslisten, damit du sie später direkt wieder auswählen kannst.  
* **Sprites aus .zip / .ftl laden & kategorisieren:** Sprites aus .zip oder .ftl reinladen, anzeigen und unter jedem Sprite Name und Kategorie eintragen (z. B. Waffe, Drohne, neuer Treibstoff, Schiff, Quest-Schiff-Freischaltung oder eigene Kategorien), sodass Name und Kategorie direkt sichtbar bleiben.  
* **In-Game-Achievements & Artwork-Upload:** Einfache Pop-up-Erstellung für In-Game-Achievements inklusive Möglichkeit zum Hochladen eines passenden Artworks.

## **5\. Normale Events, Bedingungen & Quest-Ablauf**

* **Normale Events ohne Quest-Zwang:** Normale Events bleiben normale Events (\<event name="..."\>), ohne dass sie als Quest gespeichert oder behandelt werden müssen.  
* **Bedingungen bei normalen Events:** Auch bei normalen Events (z. B. über ein Bedingungsfeld im Rechtsklick-Menü) lassen sich Bedingungen abfragen, damit ein Event oder eine Option nur dann eintritt, wenn früher im Run schon etwas passiert ist.  
* **Aufträge / zwei Quest- bzw. Auftragsarten:** Neben dem klassischen Quest-Ablauf lassen sich auch Aufträge / Folgeschritte über Bedingungen und Markierungen umsetzen, damit spätere normale Events darauf reagieren können.  
* **Schrittweiser Quest-Ablauf:** Wenn du eine Quest baust: Text in eine Box schreiben und Quest-Anfang klicken, am Ende Belohnung/Ergebnis oder Skript festlegen und Quest-Ende klicken, und das Ganze als Quest exportieren, damit es woanders (z. B. als Variable oder Event-Referenz) weiterverwendet werden kann.

# FTL Event GUI Generator – Technische Hinweise & Lessons Learned

1. **Warum `.xml.append`-Dateien oft nicht in den Dateidialogen erschienen & beim Import scheiterten:**
   - **Dateidialog-Filter:** Viele Browser filtern bei `accept=".xml,.append"` auf Betriebssystemebene Doppel-Endungen wie `events.xml.append` heraus. Lösung: `accept="*/*"` verwenden, damit wirklich jede `.xml`, `.xml.append`, `.append`, `.ftl` und `.zip` im Dateiauswahlfenster sichtbar und auswählbar ist.
   - **Inhalt von `.xml.append`-Dateien:** Anders als normale `events.xml`-Dateien enthalten `.xml.append`-Dateien oft keine kompletten `<event>`-Blöcke, sondern Slipstream-/FTLman-Patch-Befehle wie `<mod:findName name="START_BEACON"><mod:insert><choice>...</choice></mod:insert></mod:findName>`.
   - **Parser-Fix:** Vor dem Entfernen der `<mod:*>`-Wrapper müssen die Zielnamen aus `<mod:findName name="...">` extrahiert werden. Anschließend werden sowohl vollständige `<event>`-Tags als auch Top-Level-`<choice>`-Tags aus `.xml.append`-Dateien erkannt, repariert und direkt als bearbeitbare Events/Optionen geladen.

2. **Warum die Antwort-Option nicht beschreibbar war:**
   - Wenn `eventsCollection` beim Start leer (`[]`) war, wurde der gesamte Editor-Bereich (`#editor-shell`) ausgeblendet und das Antwortfeld (`#outcome-box`) war zusätzlich per `display: none` zugeklappt.
   - **Lösung:** Der Generator startet immer mit einem aktiven Default-Event (`CUSTOM_EVENT_1`) und das Antwort-/Ergebnisfeld (`#inline-outcome-text`) ist direkt unter den Auswahl-Optionen sichtbar und sofort beschreibbar.

3. **Aufgeräumtes Dropdown-Design mit Vorschlägen:**
   - Statt vieler einzelner Buttons für Mods, Sektoren und Quest-Stufen nutzt der Generator jetzt einheitliche Kombi-Dropdowns mit Texteingabe + Vorschlagsliste (`Event-ID`, `Sektor`, `Quest-Stufe`) – analog zum Belohnungs- und Konsequenzen-Menü.
