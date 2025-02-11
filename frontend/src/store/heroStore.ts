import { create } from "zustand";
import iphonefront from "@/assets/phone-front.png";
import iphonehintellinks from "@/assets/hintenlinks.png";
import iphonehintenrechts from "@/assets/hintenrechts.png";

interface HeroStore {
  images: {
    front: typeof iphonefront;
    backLeft: typeof iphonehintellinks;
    backRight: typeof iphonehintenrechts;
  };
  animations: {
    backLeft: {
      initial: { opacity: number; x: number };
      animate: { opacity: number; x: number };
    };
    backRight: {
      initial: { opacity: number; x: number };
      animate: { opacity: number; x: number };
    };
    front: {
      initial: { opacity: number; y: number };
      animate: { opacity: number; y: number };
    };
  };
  heroText: string;
}

const useHeroStore = create<HeroStore>(() => ({
  images: {
    front: iphonefront,
    backLeft: iphonehintellinks,
    backRight: iphonehintenrechts,
  },
  animations: {
    backLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
    },
    backRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
    },
    front: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  },
  heroText:
    "Stepsync ist eine Plattform für Menschen, die ihre Fitnessziele erreichen wollen. Geplant, Ergeiz und Motivation sind unsere drei Hauptmerkmale.",
}));

export default useHeroStore;
