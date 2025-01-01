import { dataFetchWithToken } from "./data-fetch";

export interface  Challenge {
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

export const fetchUserData = async (token: string) => {
  return await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
    token
  );
};

export const fetchUserUploads = async (token: string) => {
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
