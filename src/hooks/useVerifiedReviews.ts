import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { ReviewTable } from "@/types";

const REVIEW_COLUMNS = "id, rating, difficulty, labs, relevance, lectures, material, workload, comment, created_at, user_id, course_id";
const CACHE_CONFIG = {
    staleTime: 1000 * 60 * 30, // Data anses färsk i 30 min
    gcTime: 1000 * 60 * 10, // Rensas om oanvänd i 10 min
};

async function fetchNonVerifiedReviews(): Promise<ReviewTable[]> {
    // Fetch unverified reviews
    const { data: reviews, error: reviewError } = await supabase
        .from("reviews")
        .select(REVIEW_COLUMNS)
        .order("created_at", { ascending: false });

    if (reviewError) throw reviewError;
    if (!reviews) throw new Error("No reviews found");

    // Fetch all courses
    const { data: courses, error: coursesError } = await supabase
        .from("courses")
        .select("id, name, code");

    if (coursesError) throw coursesError;
    if (!courses) throw new Error("No courses found");

    // Fetch verified review IDs
    const { data: verifiedReviewIds, error: verifiedError } = await supabase
        .from("verified_reviews")
        .select("review_id");

    if (verifiedError) throw verifiedError;

    // Build lookup maps
    const verifiedIdsSet = new Set(verifiedReviewIds?.map((vr) => vr.review_id) ?? []);
    const courseNameMap = new Map(courses.map((course) => [course.id, course.name]));
    const courseCodeMap = new Map(courses.map((course) => [course.id, course.code]));

    // Filter unverified reviews and enrich with course data
    return reviews
        .filter((review) => !verifiedIdsSet.has(review.id))
        .map((review) => ({
            ...review,
            course_name: courseNameMap.get(review.course_id) || "Unknown Course",
            course_code: courseCodeMap.get(review.course_id) || "Unknown Code",
        })) as ReviewTable[];
}

async function addVerifiedReview(review_id: string): Promise<void> {
    const { error } = await supabase
        .from("verified_reviews")
        .insert([{ review_id }]);

    if (error) throw error;
}

export default function useNonVerifiedReviews(): UseQueryResult<ReviewTable[], Error> {
    return useQuery({
        queryKey: ["reviews", "unverified"],
        ...CACHE_CONFIG,
        queryFn: fetchNonVerifiedReviews,
    });
}

export { addVerifiedReview };