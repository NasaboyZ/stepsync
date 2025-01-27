import { WorkoutData } from "@/types/interfaces/workoutData";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSnackbarStore } from "@/store/snackbarStore";

export const createWorkout = async (
  workoutData: WorkoutData,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: () => void
) => {
  if (!workoutData || !accessToken) {
    useSnackbarStore.getState().openSnackbar("Keine Daten verfügbar", "error");
    return;
  }
  const payload = { ...workoutData };
  try {
    const response = await fetch("/api/create-workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Fehler beim Speichern des Workouts: ${response.status}`);
    }

    await response.json().then(() => {
      useSnackbarStore
        .getState()
        .openSnackbar("Workout wurde erfolgreich erstellt", "success");
      onSuccess();
      router.push("/workout");
    });
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
  onSuccess: () => void
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

    await response.json();
    useSnackbarStore
      .getState()
      .openSnackbar("Workout wurde erfolgreich aktualisiert", "success");
    onSuccess();
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
    onSuccess();
    router.push("/workout");
  } catch (error) {
    useSnackbarStore
      .getState()
      .openSnackbar("Fehler beim Löschen des Workouts", "error");
    console.log("Fehler beim Löschen des Workouts", error);
  }
};
