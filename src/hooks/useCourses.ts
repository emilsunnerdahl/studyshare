import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Course } from "@/types";

export default function useCourses() {
    return useQuery<Course[], Error>({
        queryKey: ["courses", "all"],
        staleTime: 1000 * 60 * 30, // Data anses färsk i 30 min
        gcTime: 1000 * 60 * 10, // Rensas om oanvänd i 10 min
        queryFn: async () => {
            const { data: courses1, error: coursesErr } = await supabase
                .from("courses")
                .select("code, name, id, credits, avg_rating, review_count")
                .range(0, 999);

            if (coursesErr) throw coursesErr;
            if (!courses1) throw new Error("No courses found");

            const { data: courses2, error: courses2Err } = await supabase
                .from("courses")
                .select("code, name, id, credits, avg_rating, review_count")
                .range(1000, 1999);

            if (courses2Err) throw courses2Err;
            if (!courses2) throw new Error("No courses found");

            // combine both course datasets
            const courses = [...courses1, ...courses2];
            return courses;
        },
    });
}