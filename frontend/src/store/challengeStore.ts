import { create } from "zustand";
import { dataFetchWithToken } from "@/utils/data-fetch";

interface ChallengeState {
  completedChallenges: number;
  openChallenges: number;
  totalChallenges: number;
  passedChallenges: number;
  fetchChallengeStats: (token: string) => Promise<void>;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  completedChallenges: 0,
  openChallenges: 0,
  totalChallenges: 0,
  passedChallenges: 0,
  fetchChallengeStats: async (token: string) => {
    try {
      const data = await dataFetchWithToken(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges/statistics`,
        token
      );

      set({
        totalChallenges: data.total,
        openChallenges: data.open,
        completedChallenges: data.completed,
        passedChallenges: data.passed,
      });
    } catch (error) {
      console.error("Fehler beim Laden der Challenge-Statistiken:", error);
    }
  },
}));
