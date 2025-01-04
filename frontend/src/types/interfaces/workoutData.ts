import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface WorkoutData {
  id?: number;
  category: string;
  description: string;
  weight: number;
  repetitions: number;
  user_id?: number;
}

export type DeleteWorkoutFunction = (
  workoutId: number,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: () => void
) => Promise<void>;
