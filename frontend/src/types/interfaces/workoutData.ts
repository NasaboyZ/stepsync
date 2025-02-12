export interface WorkoutData {
  id?: number;
  category: string;
  title: string;
  description: string;
  weight: number | null;
  repetitions: number;
  distance: number | null;
  distance_unit: string | null;
  created_at?: string;
  is_completed: boolean;
  completed_at?: string | null;
}

export interface WorkoutCardProps {
  initialData: WorkoutData;
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: (data: WorkoutData) => void;
  onStatusChange?: (isCompleted: boolean) => void;
  variant?: "primary" | "secondary";
}

export interface WorkoutStatisticsParams {
  timeframe?: string;
  category?: string;
}

export interface WorkoutStatistic {
  date: string;
  frequency: number;
}
