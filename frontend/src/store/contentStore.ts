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
      text: "Werde Teil unserer Community und verwandle jeden Schritt in Motivation! Verfolge deine Fortschritte, setze neue Ziele und bleib immer auf Kurs egal, wo du bist. Starte jetzt und erlebe Fitness neu.",
      imageSrc: bauchmuskel,
      imageAlt: "Ein Mann, der auf einem Rollstuhl sitzt",
    },
    productPage: {
      text: "StepSync ist mehr als nur eine Webapp es ist dein persönlicher Begleiter auf dem Weg zu deinen Zielen. Unsere einzigartige Technologie verbindet Motivation, Fortschrittsverfolgung und Gemeinschaft, um dir das Beste aus deinem Training zu bieten. Warum alleine kämpfen, wenn du mit StepSync smarter trainieren kannst?",
      imageSrc: productImage,
      imageAlt: "Ein Mann stemmt Gewichte und hat eine athletische Figur",
    },
  },
  getContent: (pageKey: string) => get().contentData[pageKey],
}));

export default useContentStore;
