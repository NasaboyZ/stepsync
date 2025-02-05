export type ChallengeStatus = "pending" | "accepted" | "completed" | "failed";

export interface Challenge {
  id?: number;
  title: string;
  description: string;
  status: ChallengeStatus;
  start_date: Date;
  end_date: Date;
  userId: string;
}

export interface ChallengeData {
  id?: string;
  title: string;
  description: string;
  status?: "pending" | "accepted" | "completed" | "failed";
  goal?: string;
}

export interface CreateChallenge {
  title: string;
  description: string;
}
