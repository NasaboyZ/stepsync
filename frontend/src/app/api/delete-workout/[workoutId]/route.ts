import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: { workoutId: string };
};

export async function DELETE(_request: NextRequest, { params }: Props) {
  const session = await getServerSession(authConfig);
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const workoutId = parseInt(params.workoutId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts/${workoutId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: "Workout deletion failed", error },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Workout deletion successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Workout deletion failed" },
      { status: 500 }
    );
  }
}
