import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { ReviewTable } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

async function addVerifiedReview(
  review_id: string,
  queryClient: ReturnType<typeof useQueryClient>
): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const { error } = await supabase
    .from("verified_reviews")
    .insert([{ review_id }]);

  if (error) {
    console.error("Error adding verified review:", error);
    throw new Error(`Failed to verify review: ${error.message}`);
  }

  queryClient.invalidateQueries({ queryKey: ["reviews"] });
}

export default function useReviews(): UseQueryResult<ReviewTable[], Error> {
  return useQuery({
    queryKey: ["reviews"],
    staleTime: 1000 * 60 * 30, // Data anses färsk i 30 min
    gcTime: 1000 * 60 * 10, // Rensas om oanvänd i 10 min

    queryFn: async () => {
      const { data: reviews, error: reviewError } = await supabase
        .from("reviews")
        .select(
          `
            *,
            courses (
                code,
                name
            ),
            verified_reviews (
                *
            )`
        )
        .order("created_at", { ascending: false });

      if (reviewError) throw reviewError;
      if (!reviews) throw new Error("No reviews found");

      return reviews.map(({ courses, verified_reviews, ...rest }) => ({
        ...rest,
        verified_review: verified_reviews !== null,
        course_name: courses.name || "Unknown Course",
        course_code: courses.code || "Unknown Code",
      })) as ReviewTable[];
    },
  });
}

export { addVerifiedReview };
export function getAddVerifiedReviewFn(
  queryClient: ReturnType<typeof useQueryClient>
) {
  return (review_id: string) => addVerifiedReview(review_id, queryClient);
}
