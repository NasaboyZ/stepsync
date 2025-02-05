import { WorkoutData } from "@/types/interfaces/workoutData";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSnackbarStore } from "@/store/snackbarStore";

export const createWorkout = async (
  workoutData: WorkoutData,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: (data: WorkoutData) => void
) => {
  console.log("Sending workout data:", workoutData); // Debug-Log

  if (!workoutData || !accessToken) {
    useSnackbarStore.getState().openSnackbar("Keine Daten verfügbar", "error");
    return;
  }

  const payload = {
    category: workoutData.category,
    title: workoutData.title,
    description: workoutData.description,
    weight: workoutData.weight || null,
    repetitions: workoutData.repetitions,
    distance: workoutData.distance || null,
    distance_unit: workoutData.distance_unit || null,
  };

  console.log("Formatted payload:", payload); // Debug-Log

  try {
    const response = await fetch("/api/create-workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status:", response.status); // Debug-Log

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData); // Debug-Log
      throw new Error(`Fehler beim Speichern des Workouts: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Success response:", responseData); // Debug-Log
    useSnackbarStore
      .getState()
      .openSnackbar("Workout wurde erfolgreich erstellt", "success");
    if (onSuccess) {
      onSuccess(responseData);
    }
    router.push("/workout");
  } catch (error) {
    useSnackbarStore
      .getState()
      .openSnackbar("Fehler beim Speichern des Workouts", "error");
    console.log("Fehler beim Speichern des Workouts", error);
  }
};

export const updateWorkout = async (
  workoutData: WorkoutData,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: (data: WorkoutData) => void
) => {
  if (!workoutData || !accessToken || !workoutData.id) {
    useSnackbarStore
      .getState()
      .openSnackbar("Keine Daten verfügbar oder keine ID vorhanden", "error");
    return;
  }

  try {
    const response = await fetch("/api/update-workout", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren des Workouts: ${response.status}`
      );
    }

    const data = await response.json();
    useSnackbarStore
      .getState()
      .openSnackbar("Workout wurde erfolgreich aktualisiert", "success");
    if (onSuccess) {
      onSuccess(data);
    }
    router.push("/workout");
  } catch (error) {
    useSnackbarStore
      .getState()
      .openSnackbar("Fehler beim Aktualisieren des Workouts", "error");
    console.log("Fehler beim Aktualisieren des Workouts", error);
  }
};

export const deleteWorkout = async (
  workoutId: number,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: () => void
) => {
  if (!workoutId || !accessToken) {
    useSnackbarStore.getState().openSnackbar("Keine Daten verfügbar", "error");
    return;
  }

  try {
    const response = await fetch(`/api/delete-workout/${workoutId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `Fehler beim Löschen des Workouts: ${response.status}, ${data.message}`
      );
    }

    useSnackbarStore
      .getState()
      .openSnackbar("Workout wurde erfolgreich gelöscht", "success");
    if (onSuccess) {
      onSuccess();
    }
    router.push("/workout");
  } catch (error) {
    useSnackbarStore
      .getState()
      .openSnackbar("Fehler beim Löschen des Workouts", "error");
    console.log("Fehler beim Löschen des Workouts", error);
  }
};

export const updateWorkoutStatus = async (
  workoutId: number,
  isCompleted: boolean,
  accessToken: string | undefined,
  onSuccess?: () => void
) => {
  if (!workoutId || !accessToken) {
    useSnackbarStore.getState().openSnackbar("Keine Daten verfügbar", "error");
    return;
  }

  try {
    const response = await fetch("/api/update-workout", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: workoutId,
        is_completed: isCompleted,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren des Workout-Status: ${response.status}`
      );
    }

    const data = await response.json();
    if (onSuccess) {
      onSuccess();
    }
    return data;
  } catch (error) {
    useSnackbarStore
      .getState()
      .openSnackbar("Fehler beim Aktualisieren des Workout-Status", "error");
    console.error("Fehler beim Aktualisieren des Status:", error);
  }
};
