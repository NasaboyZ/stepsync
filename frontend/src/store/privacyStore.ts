import { create } from "zustand";

interface PrivacySection {
  id: string;
  title: string;
  content:
    | string
    | {
        title: string;
        text: string;
      }[];
}

interface PrivacyStore {
  sections: PrivacySection[];
}

const usePrivacyStore = create<PrivacyStore>(() => ({
  sections: [
    {
      id: "general",
      title: "1. Allgemeine Informationen",
      content:
        "Wir legen grossen Wert auf den Schutz Ihrer personenbezogenen Daten. In dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung Ihrer Daten auf unserer Website.",
    },
    {
      id: "responsible",
      title: "2. Verantwortliche Stelle",
      content: "StepSync GmbH\nBahnhofstrasse 10\n8001 Zürich",
    },
    {
      id: "datacollection",
      title: "3. Datenerfassung auf unserer Website",
      content: [
        {
          title: "Cookies",
          text: "Unsere Website verwendet Cookies. Diese sind kleine Textdateien, die Ihr Browser automatisch erstellt und auf Ihrem Gerät speichert.",
        },
        {
          title: "Server-Log-Dateien",
          text: "Der Provider unserer Website erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch übermittelt.",
        },
      ],
    },
    {
      id: "rights",
      title: "4. Ihre Rechte",
      content:
        "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Ausserdem haben Sie ein Widerspruchsrecht gegen die Verarbeitung sowie ein Recht auf Datenübertragbarkeit.",
    },
  ],
}));

export default usePrivacyStore;
