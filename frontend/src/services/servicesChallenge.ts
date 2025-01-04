import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChallengeData } from "@/types/interfaces/challenges";

export const createChallenge = async (
  challengeData: ChallengeData,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: () => void
) => {
  if (!challengeData || !accessToken) {
    console.log("Keine Daten Verfügbar");
    return;
  }

  // Status-Mapping zwischen Frontend und Backend
  const backendStatus =
    {
      accepted: "pending",
      completed: "done",
      failed: "pass",
    }[challengeData.status as string] || "pending";

  // Erstelle ein neues Objekt mit dem gemappten Status
  const mappedChallengeData = {
    ...challengeData,
    status: backendStatus,
  };

  try {
    const response = await fetch("/api/create-challenges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedChallengeData),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Speichern der Challenge: ${response.status}`
      );
    }

    // Vereinfachter Response-Handler ohne ungenutzte Variable
    console.log("Challenge wurde erstellt");
    onSuccess();
    router.push("/challenges");
  } catch (error) {
    console.log("Fehler beim Speichern der Challenge", error);
  }
};

export const updateChallengeStatus = async (
  challengeData: ChallengeData,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: () => void
) => {
  if (!challengeData || !accessToken) {
    console.log("Keine Daten verfügbar");
    return;
  }

  // Status-Mapping zwischen Frontend und Backend
  const backendStatus =
    {
      accepted: "pending",
      completed: "done",
      failed: "pass",
    }[challengeData.status as string] || "pending";

  try {
    const response = await fetch(`/api/update-challenge/${challengeData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: backendStatus }),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren der Challenge: ${response.status}`
      );
    }

    console.log("Challenge wurde aktualisiert");
    onSuccess();
  } catch (error) {
    console.log("Fehler beim Aktualisieren der Challenge", error);
  }
};
