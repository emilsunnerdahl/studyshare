import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { ReviewTable } from "@/types";
import useCourses from "./useCourses";

export function useCourseReviews() {
    const coursesQuery = useCourses();
    const courses = coursesQuery.data || [];

    return useQuery({
        queryKey: ["reviews", "sv"],
        staleTime: 1000 * 60 * 30, // Data anses färsk i 30 min
        gcTime: 1000 * 60 * 10, // Rensas om oanvänd i 10 min
        enabled: courses.length > 0, // Only run query when courses are available

        queryFn: async () => {
            // Hämta alla rader i "reviews"-tabellen
            const { data, error } = await supabase
                .from("reviews")
                .select("id, rating, difficulty, labs, relevance, lectures, material, workload, comment, created_at, user_id, course_id")
                .order("created_at", { ascending: false });

            if (error) throw error;

            const courseNameMap = new Map(courses.map((course) => [course.id, course.name]));
            const courseCodeMap = new Map(courses.map((course) => [course.id, course.code]));

            // Returnera listan av reviews
            return data.map(review => ({
                ...review,
                course_name: courseNameMap.get(review.course_id) || "Unknown Course",
                course_code: courseCodeMap.get(review.course_id) || "Unknown Code",
            })) as ReviewTable[];
        },
    });
}
