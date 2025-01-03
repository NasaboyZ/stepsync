import { WorkoutData } from "@/types/interfaces/workoutData";
import { NextRouter } from "next/router";

export const createWorkout = async (
  workoutData: WorkoutData,
  accessToken: string | undefined,
  router: NextRouter,
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
      router.push("/workout").then(() => {
        window.location.reload();
      });
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(workoutData),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Fehler beim Aktualisieren des Workouts: ${response.status}`
    );
  }

  return response.json();
};
