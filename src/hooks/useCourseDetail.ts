import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Review, Course } from "@/types";
import { useTranslation } from "react-i18next";

export function useCourseDetail(code: string) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["course", code, lang],
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

      const { data: reviewsData, error: reviewsErr } = await supabase
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
              user_id
            `
        )
        .eq("course_id", courseData.id)
        .order("created_at", { ascending: false });

      if (reviewsErr) {
        throw reviewsErr;
      }

      let name;

      if (lang === "sv") {
        name = courseData.name;
      } else {
        name = courseData.course_translations[0].name;
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

        reviews: reviewsData ?? ([] as Review[]),
      };
    },
  });
}
