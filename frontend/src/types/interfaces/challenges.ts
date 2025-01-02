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
