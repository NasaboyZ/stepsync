import { create } from "zustand";

interface ChallengeState {
  completedChallenges: number;
  openChallenges: number;
  remainingChallenges: number;
  setCompletedChallenges: (count: number) => void;
  setOpenChallenges: (count: number) => void;
  setRemainingChallenges: (count: number) => void;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  completedChallenges: 10,
  openChallenges: 2,
  remainingChallenges: 4,
  setCompletedChallenges: (count) => set({ completedChallenges: count }),
  setOpenChallenges: (count) => set({ openChallenges: count }),
  setRemainingChallenges: (count) => set({ remainingChallenges: count }),
}));
