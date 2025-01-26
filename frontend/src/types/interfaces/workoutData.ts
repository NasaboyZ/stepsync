import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface WorkoutData {
  id?: number;
  category: string;
  description: string;
  weight: number;
  repetitions: number;
  user_id?: number;
  created_at?: string;
}

export interface WorkoutCardProps {
  variant: "primary" | "secondary";
  initialData?: WorkoutData;
  isEditing?: boolean;
  isLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: (data: WorkoutData) => void;
}

export type DeleteWorkoutFunction = (
  workoutId: number,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: () => void
) => Promise<void>;
