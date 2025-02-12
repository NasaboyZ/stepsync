import { create } from "zustand";
import { StaticImageData } from "next/image";
import manInRollstuhl from "@/assets/man-Rollstuhl.jpg";
import aboutImage from "@/assets/jogger.jpg";
import productImage from "@/assets/man-nimmt-gewicht-auf.jpg";

import runner from "@/assets/runner.jpg";
import bauchmuskel from "@/assets/frau-machtbauchtraining.jpg";
export interface ContentData {
  title?: string;
  text: string;
  imageSrc: StaticImageData;
  imageAlt: string;
}

interface ContentStore {
  contentData: Record<string, ContentData>;
  getContent: (pageKey: string) => ContentData | undefined;
}

const useContentStore = create<ContentStore>((set, get) => ({
  contentData: {
    homePage: {
      text: "Wir sind eine Online-Plattform, die du jederzeit einfach und unkompliziert nutzen kannst, um deine persönlichen Ziele zu erreichen. Die Motivation zum Aufstehen fällt manchmal schwer, das wissen wir auch, aber durch gezieltes Tracking, Planung und Ehrgeiz bleiben nicht nur wir auf Kurs, sondern auch deine Motivation.",

      imageSrc: aboutImage,
      imageAlt: "Ein Mann, der joggt und amputierte Beine hat",
    },
    aboutTeaser: {
      text: "Josef, der Erfinder von Stepsync, dachte sich , dass wenn man seine Trainingseinheiten auf einer Notiz auf seinem Iphone festhält, dies meistens nicht den nötigen Motivationsschub gibt, um auch eine solche Notiz konstant weiter zu führen. Deshalb hat er diese Plattform erfunden, damit man auch beim 4. Gang ins Fitnessstudio, auch wenn die Veränderungen nicht sichtbar sind, einen Fortschritt sieht, um die Motivation zu steigern. ",
      imageSrc: runner,
      imageAlt: "Ein Mann, der auf einem Rollstuhl sitzt",
    },
    aboutPage: {
      text: "Bei StepSync ist es unsere Mission, Menschen dabei zu unterstützen, ihre Ziele zu erreichen, indem wir ihnen Werkzeuge zur Verfügung stellen, mit denen sie Fortschritte effektiv verfolgen und verwalten können. Wir glauben, dass jeder Schritt, egal wie klein, zum Erfolg beiträgt, wenn er mit einem klaren Ziel verbunden ist.",
      imageSrc: manInRollstuhl,
      imageAlt: "Ein Mann, der auf einem Rollstuhl sitzt",
    },
    productTeaser: {
      text: "Wir haben die Technologie und die Tabellen, du hast den Wert! Unsere Unkomplizierten und Persönlichen Trainingstabellen zeigen dir, wo du stehst. Sobald du deine Fitnessübungen aufschreibst, siehst du deine Fortschritte und kannst dich auf dein Traumziel freuen. Kostenlos und effektiv.",
      imageSrc: bauchmuskel,
      imageAlt: "Ein Mann, der auf einem Rollstuhl sitzt",
    },
    productPage: {
      text: "StepSync ist mehr als nur eine Webapp, es ist sehr wichtig, sei es aus gesundheitlichen Gründen oder um sein Traumziel zu erreichen, Sport zu treiben. Es kann Stress reduzieren, sei es bei der Arbeit oder im Studium. Sich neue Gewohnheiten anzueignen ist manchmal sehr schwer, aber mit unseren Ergebnissen wird deine Motivation steigen und du wirst es lieben.",
      imageSrc: productImage,
      imageAlt: "Ein Mann stemmt Gewichte und hat eine athletische Figur",
    },
  },
  getContent: (pageKey: string) => get().contentData[pageKey],
}));

export default useContentStore;
