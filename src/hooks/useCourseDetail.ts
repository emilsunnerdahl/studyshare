import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Review, Course } from "@/types";

export function useCourseDetail(code: string) {
  return useQuery({
    queryKey: ["course", code],
    enabled: !!code,
    staleTime: 1000 * 60 * 30, // 30 minuter ny fetch,
    gcTime: 1000 * 60 * 10, // ta bort data om oanvänd i 10 min,
    queryFn: async () => {
      const { data: courseData, error: courseErr } = await supabase
        .from("courses")
        .select(
          `
              code,
              name,
              credits,
              id
            `
        )
        .eq("code", code)
        .maybeSingle();

      if (courseErr) throw courseErr;
      if (!courseData) throw new Error("Course not found");

      const { data: reviewsData, error: reviewsErr } = await supabase
        .from("reviews")
        .select(
          `
              created_at,
              difficulty,
              fun,
              lectures,
              material,
              workload,
              rating,
              id,
              comment,
              user_id
            `
        )
        .eq("course_id", courseData.id)
        .order("created_at", { ascending: false });

      if (reviewsErr) {
        throw reviewsErr;
      }

      return {
        course: {
          code: courseData.code,
          name: courseData.name ?? courseData.code,
          id: courseData.id,
          credits: courseData.credits,
          avg_rating: 0,
          review_count: 0,
        } as Course,

        reviews: reviewsData ?? ([] as Review[]),
      };
    },
  });
}
