# Gesundheits- & Fitnesscheck

Eine mobile-first Web-App für Gesundheits- und Fitnessumfragen mit 22 Fragen und CSV-Export-Funktionalität.

## Features

- ✅ 22 Gesundheitsfragen (eine pro Screen)
- ✅ Spezielle Unterfragen für Frage 15 (Übersäuerung)
- ✅ Fortschrittsbalken und Navigation
- ✅ Mobile-first Design mit Tailwind CSS
- ✅ LocalStorage für Persistenz
- ✅ CSV-Export per E-Mail und Download
- ✅ DSGVO-konformer Rechtshinweis
- ✅ Serverlos (keine Datenbank erforderlich)

## Schnelle Installation

### Option 1: Lokaler Test
```bash
# Einfach die index.html in einem Browser öffnen
open index.html
```

### Option 2: Live Server (empfohlen für Entwicklung)
```bash
# Mit Node.js
npx live-server

# Oder mit Python
python -m http.server 8000
```

## Deployment-Optionen

### 1. GitHub Pages (Kostenlos & Schnell)

1. **Repository erstellen:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **GitHub Repository erstellen** und Code pushen

3. **GitHub Pages aktivieren:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

4. **URL erhalten:** `https://username.github.io/repository-name`

### 2. Netlify (Kostenlos & Automatisch)

1. **Netlify Account erstellen** (netlify.com)

2. **Deploy via Drag & Drop:**
   - Alle Dateien in Netlify Dashboard ziehen
   - Automatisches Deployment

3. **Oder via Git:**
   - GitHub Repository verbinden
   - Automatisches Deployment bei jedem Push

### 3. Vercel (Kostenlos & Schnell)

1. **Vercel Account erstellen** (vercel.com)

2. **GitHub Repository importieren**

3. **Automatisches Deployment**

## Projektstruktur

```
Fitline-Vitalcheck/
├── index.html          # Haupt-HTML-Datei
├── app.js             # JavaScript-Logik
├── requirements.md    # Projektanforderungen
└── README.md         # Diese Datei
```

## Technische Details

- **Frontend:** HTML5 + Tailwind CSS + Vanilla JavaScript
- **State Management:** LocalStorage
- **Export:** CSV über mailto-Links
- **Responsive:** Mobile-first Design
- **Browser Support:** Alle modernen Browser

## Anpassungen

### E-Mail-Adresse ändern
In `app.js` Zeile 189:
```javascript
const email = 'ihre-email@domain.com';
```

### Fragen anpassen
In `app.js` das `questions` Array bearbeiten.

### Design anpassen
Tailwind CSS Klassen in `index.html` modifizieren.

## Browser-Kompatibilität

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Browser (iOS Safari, Chrome Mobile)

## DSGVO-Konformität

Die App enthält:
- Klaren Rechtshinweis vor Datenübertragung
- Keine dauerhafte Datenspeicherung (nur LocalStorage)
- Transparente Datenverarbeitung

## Support

Bei Fragen oder Problemen:
1. Browser-Konsole prüfen (F12)
2. LocalStorage leeren bei Problemen
3. Browser-Cache leeren

## Lizenz

Dieses Projekt ist für den internen Gebrauch bestimmt. 