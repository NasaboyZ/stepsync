export interface UserProfile {
  username: string;
  age: number;
  sex: string;
  height: number;
  weight: number;
  goal: string;
  avatar?: {
    id: number;
    url: string;
  };
  level: number;
  xp: number;
  workouts: number;
  memberSince: string;
}
