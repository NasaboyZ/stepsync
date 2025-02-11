export interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  height?: number;
  weight?: number;
  goal?: string;
  date_of_birth?: string;
  workouts?: number;
  memberSince?: string;
}

export interface UpdateUserProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  height?: number;
  weight?: number;
  goal?: string;
  gender?: "male" | "female" | "other";
  date_of_birth?: string;
}
