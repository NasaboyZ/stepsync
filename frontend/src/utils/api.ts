import { WorkoutData } from "@/types/interfaces/workoutData";
import { dataFetchWithToken } from "./data-fetch";
import { UserProfile } from "@/types/interfaces/userProfile";
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

export interface BmiHistoryData {
  height: number;
  weight: number;
  bmi_value: number;
  created_at: string;
}

export interface AvatarData {
  id: number;
  url: string;
}

export interface WorkoutStatistics {
  date: string;
  frequency: number;
}

export interface WorkoutStatisticsParams {
  timeframe?: string;
  category?: string;
}

export const fetchUserData = async (token: string): Promise<UserProfile> => {
  const data = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
    token
  );

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    username: data.username,
    age: data.age,
    height: data.height,
    weight: data.weight,
    goal: data.goal,
    workouts: data.workouts,
    memberSince: data.memberSince,
  };
};

export const fetchUserUploads = async (
  token: string
): Promise<ImageResponse> => {
  const data = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
    token
  );
  if (!data) {
    throw new Error("Keine Daten empfangen");
  }
  return data;
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

export const fetchBmiHistory = async (
  token: string
): Promise<BmiHistoryData[]> => {
  const data = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/bmi/history`,
    token
  );
  return data.history;
};

export const fetchUserAvatar = async (
  token: string
): Promise<{ path: string | null }> => {
  const data = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/avatar`,
    token
  );
  return data;
};

export const fetchWorkoutStatistics = async (
  token: string,
  params: WorkoutStatisticsParams = {}
): Promise<WorkoutStatistics[]> => {
  const { timeframe = "12_months", category = "all" } = params;

  const data = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts/statistics?timeframe=${timeframe}&category=${category}`,
    token
  );

  if (!data) {
    throw new Error("Keine Statistikdaten empfangen");
  }

  return data;
};
