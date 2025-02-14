# Frontend-Projekt
## Beschreibung
Dies ist das Backend für eine Fitness-Tracking-App, die es Benutzern ermöglicht, verschiedene Fitness-Herausforderungen zu verfolgen, an diesen teilzunehmen und Fortschritte zu protokollieren. Benutzer können zufällige Herausforderungen erhalten, Herausforderungen annehmen oder ablehnen, und ihren Fortschritt als erledigt oder nicht erledigt markieren. Zudem können sie ihre Workouts protokollieren und ihren BMI überwachen.

## Features

Challenges annehmen oder ablehnen: Benutzer können Herausforderungen annehmen, ablehnen oder als erledigt markieren.
Workouts verfolgen: Benutzer können ihre Workouts und Fitnessaktivitäten protokollieren.
BMI-Überwachung: Benutzer können ihren BMI überwachen, basierend auf ihren eingegebenen Körperdaten.
Dashboard: Ein persönliches Dashboard für Benutzer, das Informationen wie abgeschlossene Challenges, Workouts und den BMI anzeigt.

## Voraussetzungen

- Node.js (Version 16 oder höher)
- npm oder yarn
- Git

## Installation

1. **Repository klonen**

   ```sh
   git clone https://github.com/NasaboyZ/stepsync.git
   cd stepsync
   ```

2. **Umgebungsvariablen konfigurieren**
   Erstellen oder öffnen Sie die Datei `.env.example` und passen Sie die Werte entsprechend an:

   ```ini
   BACKEND_URL=<URL_Ihres_Backend-Servers>
   AUTH_URL=<URL_Ihres_Auth-Servers>
   NEXT_PUBLIC_BACKEND_URL=<Öffentliche_Backend-URL>
   PUBLIC_GOOGLE_ANALYTICS_ID=<Google Analytics ID (optional)>
   NEXTAUTH_URL=<URL Ihrer NextAuth-Anwendung>
   NEXTAUTH_SECRET=<Ihr geheimer Schlüssel für NextAuth>
   ```

3. **Abhängigkeiten installieren**

   ```sh
   npm install
   ```

4. **Projekt starten**
   ```sh
   npm run dev
   ```

Das Projekt ist nun unter `http://localhost:3000` erreichbar (falls nicht anders konfiguriert).
