export type AvgReviews = {
  rating: number;
  difficulty: number;
  labs: number;
  relevance: number;
  lectures: number;
  material: number;
  workload: number;
};

export type Review = {
  id: string;
  rating: number;
  difficulty: number;
  labs: number;
  relevance: number;
  lectures: number;
  material: number;
  workload: number;
  comment: string;
  created_at: string;
  user_id?: string;
  verified_review?: boolean;
};

export type ReviewTable = Review & {
  course_name: string;
  course_code: string;
};

export type Course = {
  code: string;
  name: string;
  id: string;
  credits: string;
  avg_rating: number;
  review_count: number;
};

export type Specialisation = {
  title: string;
  courses: Course[];
};

export type Program = {
  id: string;
  name: string;
  program_code: string;
  color_code: string;
};
