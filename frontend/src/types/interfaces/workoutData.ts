export interface WorkoutData {
  id?: number;
  category: "krafttraining" | "cardio";
  title: string;
  description: string;
  weight: number | null;
  repetitions: number;
  distance?: number | null;
  distance_unit?: "meter" | "kilometer" | null;
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
