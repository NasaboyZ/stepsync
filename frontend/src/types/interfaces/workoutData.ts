export interface WorkoutData {
  id?: number;
  category: "krafttraining" | "cardio";
  title: string;
  description: string;
  weight: number;
  repetitions: number;
  distance?: number;
  distanceUnit?: "meter" | "kilometer" | "runden";
  created_at?: string;
}

export interface WorkoutCardProps {
  variant: "primary" | "secondary";
  initialData: WorkoutData;
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: (data: WorkoutData) => void;
}
