import { create } from "zustand";
import { StaticImageData } from "next/image";
import manInRollstuhl from "@/assets/man-Rollstuhl.jpg";
import aboutImage from "@/assets/jogger.jpg";
import productImage from "@/assets/man-nimmt-gewicht-auf.jpg";
import drinkflasche from "@/assets/drink-flasche.png";
import iphoneLinks from "@/assets/hintenlinks.png";
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
      text: "Bist du bereit, deine Fitnessziele zu rocken? Bei Stepsync geht es um mehr als nur Training,es geht um die beste Version von dir! Finde Workouts, die zu dir passen, teile deine Erfolge und stürze dich in aufregende Challenges. Werde Teil unserer Community und starte heute durch, dein neues Ich wartet!",
      imageSrc: manInRollstuhl,
      imageAlt: "Ein Mann, der auf einem Rollstuhl sitzt",
    },
    aboutTeaser: {
      text: "Die Geschichte von StepSync begann mit der Leidenschaft, Menschen dabei zu helfen, im Einklang mit ihren Zielen zu bleiben. Wir haben eine Plattform geschaffen, die Nutzer dabei unterstützt, ihre Fortschritte zu verfolgen und motiviert zu bleiben. Jede Funktion wurde entwickelt, um jeden Schritt bedeutungsvoll zu machen und eine nahtlose Reise zum Erfolg zu gewährleisten.",
      imageSrc: drinkflasche,
      imageAlt: "Ein Mann, der auf einem Rollstuhl sitzt",
    },
    aboutPage: {
      text: "Bei StepSync ist es unsere Mission, Menschen dabei zu unterstützen, ihre Ziele zu erreichen, indem wir ihnen Werkzeuge zur Verfügung stellen, mit denen sie Fortschritte effektiv verfolgen und verwalten können. Wir glauben, dass jeder Schritt, egal wie klein, zum Erfolg beiträgt, wenn er mit einem klaren Ziel verbunden ist.",
      imageSrc: aboutImage,
      imageAlt: "Ein Mann, der joggt und amputierte Beine hat",
    },
    productTeaser: {
      text: "Werde Teil unserer Community und verwandle jeden Schritt in Motivation! Verfolge deine Fortschritte, setze neue Ziele und bleib immer auf Kurs egal, wo du bist. Starte jetzt und erlebe Fitness neu.",
      imageSrc: iphoneLinks,
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
