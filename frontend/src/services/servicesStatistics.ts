import {
  WorkoutStatistic,
  WorkoutStatisticsParams,
} from "@/types/interfaces/workoutData";
import { fetchWorkoutStatistics } from "@/utils/api";
import { useSnackbarStore } from "@/store/snackbarStore";

export const getWorkoutStatistics = async (
  accessToken: string | undefined,
  params: WorkoutStatisticsParams = {}
): Promise<WorkoutStatistic[]> => {
  if (!accessToken) {
    useSnackbarStore
      .getState()
      .openSnackbar("Keine Authentifizierung vorhanden", "error");
    return [];
  }

  try {
    const statistics = await fetchWorkoutStatistics(accessToken, params);
    return statistics;
  } catch (error) {
    useSnackbarStore
      .getState()
      .openSnackbar("Fehler beim Laden der Workout-Statistiken", "error");
    console.error("Fehler beim Laden der Statistiken:", error);
    return [];
  }
};
