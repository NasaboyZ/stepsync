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


export interface CreateChallenge {
  title: string;
  description: string;
  goal: string;
}

// Alternativ können Sie auch Partial<Challenge> verwenden, wo Sie das vereinfachte Interface benötigen
