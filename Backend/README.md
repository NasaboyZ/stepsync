# Fitness Challenge App - Backend

## Beschreibung

Dies ist das Backend für eine Fitness-Tracking-App, die es Benutzern ermöglicht, verschiedene Fitness-Herausforderungen zu verfolgen, an diesen teilzunehmen und Fortschritte zu protokollieren. Benutzer können zufällige Herausforderungen erhalten, Herausforderungen annehmen oder ablehnen, und ihren Fortschritt als erledigt oder nicht erledigt markieren. Zudem können sie ihre Workouts protokollieren und ihren BMI überwachen.

## Features

- **Zufällige Fitness-Challenges**: Benutzer erhalten zufällige Fitness-Herausforderungen, um Motivation und Abwechslung zu fördern.
- **Challenges annehmen oder ablehnen**: Benutzer können Herausforderungen annehmen, ablehnen oder als erledigt markieren.
- **Workouts verfolgen**: Benutzer können ihre Workouts und Fitnessaktivitäten protokollieren.
- **BMI-Überwachung**: Benutzer können ihren BMI überwachen, basierend auf ihren eingegebenen Körperdaten.
- **Dashboard**: Ein persönliches Dashboard für Benutzer, das Informationen wie abgeschlossene Challenges, Workouts und den BMI anzeigt.

## Installation

### Voraussetzungen

- PHP >= 7.x
- Laravel Framework
- SQLite (oder ein anderer unterstützter Datenbanktyp)
- Composer

### Schritte zur Installation und Start

1. Installieren Sie alle erforderlichen Abhängigkeiten:

   ```bash
   composer install
   ```

2. Erstellen Sie die Datenbank und führen Sie die Migrationen und Seeder aus:

   ```bash
   npm run seed
   ```

3. Starten Sie den Entwicklungsserver:
   ```bash
   npm run serve
   ```

Die Anwendung sollte nun unter `http://localhost:8000` erreichbar sein.
