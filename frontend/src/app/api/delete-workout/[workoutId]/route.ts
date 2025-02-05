import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { workoutId: number } }
) {
  if (request.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const session = await getServerSession(authConfig);
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const workoutId = params.workoutId;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts?id=${workoutId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ id: workoutId }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: "workout deletion failed", error },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "workout deletion successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "workout deletion failed" },
      { status: 500 }
    );
  }
}
