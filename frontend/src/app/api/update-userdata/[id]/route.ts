import { NextRequest, NextResponse } from "next/server";
import { UpdateUserProfileData } from "@/types/interfaces/userProfile";

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const data: UpdateUserProfileData = await request.json();
    const id = request.nextUrl.pathname.split("/").pop() || "";

    console.log("Received data:", data);
    console.log("User ID:", id);
    console.log("Auth token:", request.headers.get("Authorization"));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      // Detailliertere Fehlermeldung
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Fehler beim Aktualisieren des Benutzerprofils"
      );
    }

    const updatedProfile = await response.json();
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Fehler beim Aktualisieren des Benutzerprofils",
        details: error,
      },
      { status: 500 }
    );
  }
}
