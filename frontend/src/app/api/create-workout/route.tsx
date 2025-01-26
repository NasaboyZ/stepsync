import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const session = await getServerSession(authConfig);
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const workoutData = await request.json();
    console.log("Empfangene Daten:", workoutData);

    // Detaillierte Validierung
    const validationErrors = [];
    if (!workoutData.title) validationErrors.push("Titel ist erforderlich");
    if (!workoutData.description)
      validationErrors.push("Beschreibung ist erforderlich");
    if (!workoutData.category)
      validationErrors.push("Kategorie ist erforderlich");
    if (
      workoutData.category &&
      !["cardio", "krafttraining"].includes(workoutData.category)
    ) {
      validationErrors.push(
        "Kategorie muss 'cardio' oder 'krafttraining' sein"
      );
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { message: "Validierungsfehler", errors: validationErrors },
        { status: 422 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(workoutData),
      }
    );

    const data = await response.json();
    console.log("Backend-Antwort:", data);

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message || "Fehler beim Erstellen des Workouts",
          errors: data.errors,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
