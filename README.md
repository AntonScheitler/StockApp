# Aktien App

---

## Allgemeines

Es handelt sich hierbei um eine Aktien App, welche es seinen Nutzern erlaubt, den momentanen Preis einer Aktie einzusehen und sie in ihrer persönlichen Watchlist zu speichern

---

## Einrichten der Umgebung

### Frontend

Alle nötigen Frontend Dependencies können ganz normal über npm installiert werden:

    npm install

Sind alle Dependencies installiert, kann die App wie eine reguläre React App gestartet werden:

    npm start

### Backend

Als Datenbank dient eine lokale Instanz von MongoDB. Der Download hiervon ist über **https://www.mongodb.com/try/download/community** möglich

Nach dem erfolgreichen Download muss eine neue Datenbank erstellt werden. Hierfür muss die CLI geöffnet, und folgender Befehl ausgeführt werden:

    use stonkusers

Zurück im Projekt müssen noch alle Backend Dependencies über npm installiert werden:

    npm install

Der Server wurde bereits mit nodemon konfiguriert. Um den Server mit nodemon hochzufahren, muss folgender Befehl ausgeführt werden

    npm run server

---

## Aufbau des Projekts

### React

ReactJS wird als Frontend Library genutzt und wurde mit Typescrpit konfiguriert

### Authentifizierung

Für die Authentifizierung werden JSON Web Tokens verwendet. Diese werden im sessionStorage eines Nutzers gespeichert

### Styling

Für das Styling wurde ausschließlich die Bootstrap Library verwendet

### Express

Das Framework ExpressJS wird für den Server genutzt

### MongoDB

Als Datenbank wird MongoDB verwendet. Es wird eine einzige Datenbank für das Speichern von Usern und ihren Daten angelegt

### IEX Api

Für das Einsehen von Informationen über Aktien wird die twelvedata Api verwendet

### Kommunikation

Mit dem Server und Thrid-Party-Apis wird über REST Apis via der axios Library kommuniziert
