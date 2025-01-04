import { WorkoutData } from "@/types/interfaces/workoutData";
import { dataFetchWithToken } from "./data-fetch";
import { UserProfile } from "@/types/interfaces/userProfile";
import { NextRouter } from "next/router";
import { ImageResponse } from "@/types/interfaces/imageData";

export interface Challenge {
  id: number;
  title: string;
  description: string;
  goal: string;
  status: boolean;
  start_date: string;
  end_date: string;
}

export interface UserData {
  username: string;
}

export interface UploadsData {
  images: Array<{
    pathname: string;
  }>;
}

export interface UploadResponse {
  url: string;
  pathname: string;
}

export const fetchUserData = async (token: string): Promise<UserProfile> => {
  const data = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
    token
  );

  return {
    username: data.username,
    age: data.age,
    sex: data.gender,
    height: data.height,
    weight: data.weight,
    goal: data.goal,
    avatar: data.avatar,
  };
};

export const fetchUserUploads = async (
  token: string
): Promise<ImageResponse> => {
  return await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
    token
  );
};

export const fetchChallenges = async (token: string) => {
  const data = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges`,
    token
  );
  return data.challenges || data;
};

export const fetchWorkouts = async (token: string): Promise<WorkoutData[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const createChallenge = async (
  challenge: {
    title: string;
    description: string;
    goal: string;
    status: string;
  },
  token: string,
  router: NextRouter,
  onSuccess?: () => void
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(challenge),
    }
  );

  if (!response.ok) {
    throw new Error("Fehler beim Erstellen der Challenge");
  }

  const data = await response.json();

  if (onSuccess) {
    onSuccess();
  }

  return data;
};

export const uploadAvatar = async (
  file: File,
  token: string
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Fehler beim Hochladen des Avatars");
  }

  return response.json();
};
