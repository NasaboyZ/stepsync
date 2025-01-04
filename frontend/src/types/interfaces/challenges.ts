export interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: string;
  status: string;
  start_date: Date;
  end_date: Date;
  userId: string;
}

export interface ChallengeData {
  id?: string;
  title: string;
  description: string;
  goal: string;
  status?: "pending" | "accepted" | "completed" | "failed";
}

export interface CreateChallenge {
  title: string;
  description: string;
  goal: string;
}
