import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Review, Course } from "@/types";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

export function useCourseDetail(code: string) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { user } = useAuth();

  return useQuery({
    queryKey: ["course", code, lang, user?.id],
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
              id,
              course_translations (
                name
              )
            `
        )
        .eq("code", code)
        .maybeSingle();

      if (courseErr) throw courseErr;
      if (!courseData) throw new Error("Course not found");

      let name;
      if (lang === "sv") {
        name = courseData.name;
      } else {
        name = courseData.course_translations[0].name;
      }

      let query = supabase
        .from("reviews")
        .select(
          `
              created_at,
              difficulty,
              relevance,
              labs,
              lectures,
              material,
              workload,
              rating,
              id,
              comment,
              user_id,
              verified_reviews!inner (
                review_id
              )
            `
        )
        .eq("course_id", courseData.id)
        .order("created_at", { ascending: false });

      if (user?.id) {
        query.neq("user_id", user.id);
      }

      const { data: reviewsData, error: reviewsErr } = await query;

      if (reviewsErr) {
        throw reviewsErr;
      }

      const mappedReviews = reviewsData.map(
        ({ verified_reviews, ...rest }) => ({
          ...rest,
          verified_review: true,
        })
      );

      let reviewData, reviewErr;

      if (user?.id) {
        let query = supabase
          .from("reviews")
          .select(
            `
            *,
            verified_reviews ( review_id )
          `
          )
          .eq("course_id", courseData.id)
          .eq("user_id", user.id);

        ({ data: reviewData, error: reviewErr } = await query);

        if (reviewErr) {
          throw reviewErr;
        }

        reviewData = reviewData?.map(({ verified_reviews, ...rest }) => ({
          ...rest,
          verified_review: verified_reviews !== null,
        }));
      }

      return {
        course: {
          code: courseData.code,
          name: name,
          id: courseData.id,
          credits: courseData.credits,
          avg_rating: 0,
          review_count: 0,
        } as Course,
        ownReview: reviewData ? reviewData[0] : (null as Review | null),
        reviews: mappedReviews ?? ([] as Review[]),
      };
    },
  });
}
