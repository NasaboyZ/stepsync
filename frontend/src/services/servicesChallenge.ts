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

  const backendStatus =
    {
      pending: "pending",
      accepted: "accepted",
      completed: "done",
      failed: "pass",
    }[challengeData.status as string] || "pending";

  const mappedChallengeData = {
    ...challengeData,
    status: backendStatus,
  };

  try {
    const response = await fetch("/api/create-challenges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(mappedChallengeData),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Speichern der Challenge: ${response.status}`
      );
    }

    console.log("Challenge wurde erstellt");
    onSuccess();
    router.push("/challenges");
  } catch (error) {
    console.log("Fehler beim Speichern der Challenge", error);
  }
};

export const updateChallenge = async (
  challengeData: ChallengeData,
  accessToken: string | undefined,
  router: AppRouterInstance,
  onSuccess: () => void
) => {
  if (!challengeData || !challengeData.id || !accessToken) {
    console.log("Keine Daten oder ID verfügbar");
    return;
  }

  const backendStatus =
    {
      pending: "pending",
      accepted: "accepted",
      completed: "done",
      failed: "pass",
    }[challengeData.status as string] || "pending";

  try {
    const response = await fetch(`/api/update-challenges/${challengeData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: challengeData.title,
        description: challengeData.description,
        goal: challengeData.goal,
        status: backendStatus,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren der Challenge: ${response.status}`
      );
    }

    console.log("Challenge wurde aktualisiert");
    onSuccess();
    router.refresh();
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Challenge:", error);
  }
};
