Product Requirements Document (PRD)

Projekt: Gesundheits- & Fitnessumfrage (Web-App, mobil optimiert)
Version: Final für MVP
Stand: 2025-08-04
1. Projektübersicht

Die Gesundheits- und Fitnessumfrage ist eine mobile-first Web-App, die Nutzern ermöglicht:

    22 Gesundheitsfragen zu beantworten

    Am Ende ihre Antworten als CSV im E-Mail-Body zu versenden

    Komplett serverlos (keine Datenbank, kein Backend notwendig)

Besonderheiten:

    Startseite: Eingabe des Vornamens als Pflichtfeld

    Fragen einzeln mit Fortschrittsbalken und Ja/Nein-Buttons

    Navigation: Zurück / Weiter

    Abschlussseite: Rechtshinweis + Mailversand (CSV im Body)

    CSV-Format erleichtert serverseitige Weiterverarbeitung

2. Ziele

    Einfache, mobile Bedienung für Gesundheits-Check

    Serverlose Datenerfassung ohne Speicherung in DB

    Export als CSV über E-Mail, damit Auswertung z. B. per Script automatisiert werden kann

    DSGVO-Konformität durch klaren Rechtshinweis vor Absenden

3. Zielgruppe

    Gesundheits- und Ernährungsberater:innen

    Fitnessstudios, Wellness-Coaches

    Privatpersonen für Self-Check

4. Kernfunktionen
4.1 Startseite

    Titel: „Gesundheits- & Fitnesscheck“

    Textfeld für Vornamen (Pflichtfeld)

    Startbutton erst aktiv, wenn Vorname nicht leer ist

4.2 Fragen-Workflow

    22 Hauptfragen (eine pro Screen)

    Frage 15 hat 5 Unterfragen (Checkboxen oder mehrere Antworten)

    Ja/Nein-Buttons groß, gut klickbar

    Navigation:

        Button „Zurück“

        Button „Weiter“

        Fortschrittsanzeige: Balken + „Frage X von 22“

4.3 Abschlussseite

    Zusammenfassung: „Sie haben alle Fragen beantwortet.“

    Rechtshinweis:
    „Mit dem Absenden willigen Sie ein, dass Ihre Gesundheitsdaten an Franziska Ehret übermittelt werden.“

    Buttons:

        „Ergebnisse per E-Mail senden“ → öffnet Mail-App mit CSV im Body

        (Optional) „CSV herunterladen“ als Backup

4.4 CSV-Mail

    Mailto-Link mit:

        Empfänger: franziska.ehret@example.com

        Betreff: Gesundheits- & Fitnessumfrage

        Mail-Body enthält CSV, z. B.:

        Vorname,Max
        Frage,Antwort
        1,Ja
        2,Nein
        …
        22,Ja

5. Fragenkatalog (vollständig)

    Haben Sie tagsüber „Energielöcher“ oder fühlen sich häufig müde und erschöpft?

    Fällt es Ihnen schwer, sich über längere Zeit zu konzentrieren?

    Leiden Sie ab und zu unter Kopfschmerzen und/oder Migräne?

    Leiden Sie unter häufigem Frieren (kalte Hände, kalte Füße)?

    Trinken Sie weniger als 2,5 Liter (ohne Kohlensäure) Wasser pro Tag?

    Sind Sie anfällig für Erkältungen oder Infekte?

    Machen Sie an weniger als 3 Tagen die Woche mindestens 30 Minuten Sport?

    Rauchen Sie?

    Haben Sie Probleme mit der Verdauung, dem Darm oder dem Magen?

    Werden Sie regelmäßig von Allergien (z. B. Heuschnupfen) heimgesucht und/oder leiden Sie an Neurodermitis oder Schuppenflechte?

    Essen Sie weniger als 5–6 Portionen frisches Obst und Gemüse täglich à 150 Gramm?

    Haben Sie manchmal Verspannungen, Wadenkrämpfe und/oder steife, müde Gelenke oder Gelenkschmerzen?

    Haben Sie oft Probleme einzuschlafen und/oder einen erholsamen Schlaf zu finden?

    Sind Sie von Osteoporose oder Arthrose betroffen?

    Neigen Sie schnell zur Übersäuerung?
      - Essen Sie viel Fleisch bzw. Schweinefleisch? (Harnsäure / Schwefelsäure)
      - Essen Sie viel Süßes oder Fettes? (Essigsäure)
      - Essen Sie Käse und/oder Wurst? (Salpetersäure)
      - Trinken Sie Kaffee oder schwarzen Tee? (Gerbsäure)
      - Treiben Sie viel Sport? (Milchsäure)

    Möchten Sie Ihren Körper modellieren und Ihre Figur besser in Form bringen?

    Sind Sie über 35 Jahre alt?

    Sind Sie von Diabetes betroffen?

    Leiden Sie unter Herz-Kreislauf-Beschwerden und/oder hatten Sie schon einmal einen Herzinfarkt?

    Ist Ihr Cholesterinwert erhöht?

    Essen Sie weniger als 2–3 Mal pro Woche Lachs, Makrele oder Thunfisch?

    Nehmen Sie Medikamente und/oder die Antibabypille?

6. Technische Umsetzung (MVP)

    Frontend:

        HTML + Tailwind CSS (später Next.js für SPA)

        Optional TypeScript in Cursor für bessere Wartbarkeit

    State Management:

        JavaScript-Array für Antworten

        Optional LocalStorage, um bei Browser-Refresh nicht zu verlieren

    Mailversand:

        Serverlos über mailto:-Link

        CSV im Body

    Responsives UI:

        Mobile-first Design

        Große Buttons und klare Farbgebung:

            Ja: Grün (#4CAF50)

            Nein: Rot (#F44336)

            Navigation: Blau (#2196F3)

7. Erweiterungen (Future Scope)

    Automatischer Versand ohne Mail-App über Serverless Function (Vercel/Firebase)

    Speicherung in Google Sheets statt nur Mail

    PWA-Modus für Offline-Nutzung

    Risiko-Scoring-Logik mit farblicher Auswertung

    Mehrsprachigkeit (Deutsch/Englisch)

8. Abnahmekriterien (MVP)

Nutzer kann Vorname eingeben → Start freigeschaltet

22 Fragen mit Fortschrittsbalken und Navigation funktionieren

Abschlussseite zeigt Rechtshinweis

Klick auf „Ergebnisse per E-Mail senden“ öffnet Mail-App mit CSV im Body

CSV enthält Vorname und alle Antworten