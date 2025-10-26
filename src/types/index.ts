export type AvgReviews = {
  rating: number;
  difficulty: number;
  fun: number;
  lectures: number;
  material: number;
  workload: number;
};

export type Review = {
  id: string;
  rating: number;
  difficulty: number;
  fun: number;
  lectures: number;
  material: number;
  workload: number;
  comment: string;
  created_at: string;
  user_id?: string;
};

export type Course = {
  code: string;
  name: string;
  id: string;
  credits: string;
};
