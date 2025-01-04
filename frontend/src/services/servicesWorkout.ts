import { WorkoutData } from "@/types/interfaces/workoutData";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const createWorkout = async (
  workoutData: WorkoutData,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: () => void
) => {
  if (!workoutData || !accessToken) {
    console.log("Keine Daten Verfügbar");
    return;
  }
  const payload = { ...workoutData };
  try {
    const response = await fetch("/api/create-workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    //TODO: Snackbar einbauen für die fehler meldung für den user
    if (!response.ok) {
      throw new Error(`Fehler beim Speichern des Workouts: ${response.status}`);
    }

    await response.json().then(() => {
      console.log("workout wurde erstellt");
      onSuccess();
      router.push("/workout");
    });
  } catch (error) {
    //TODO: fehler meldung für den user wenns sicht gespeichert werden kann
    console.log("Fehler beim Speichern des Workouts", error);
  }
};

export const updateWorkout = async (
  workoutData: WorkoutData,
  accessToken: string
) => {
  if (!workoutData || !accessToken) {
    console.log("Keine Daten Verfügbar");
    return;
  }
  const payload = { ...workoutData };
  try {
    const response = await fetch("/api/update-workout", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    //TODO: Snackbar einbauen für die fehler meldung für den user
    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren des Workouts: ${response.status}`
      );
    }

    const data = await response.json();
    const workoutId = data.id;
    //TODO: user feedback for updating workout also mach eine Snackbar

    return workoutId;
  } catch (error) {
    //TODO: fehler meldung für den user wenns sicht gespeichert werden kann
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
    console.log("Keine Daten Verfügbar");
    return;
  }

  try {
    const response = await fetch(`/api/delete-workout/${workoutId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    //TODO: Snackbar einbauen für die fehler meldung für den user beim löschen des workouts
    if (!response.ok) {
      throw new Error(
        `Fehler beim Löschen des Workouts: ${response.status}, ${data.message}`
      );
    }

    await response.json().then(() => {
      console.log("workout wurde gelöscht");
      onSuccess();
      // router.push("/workout");
    });
  } catch (error) {
    //TODO: fehler meldung für den user wenns sicht gespeichert werden kann
    console.log("Fehler beim Speichern des Workouts", error);
  }
};
