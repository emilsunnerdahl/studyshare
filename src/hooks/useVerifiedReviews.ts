import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { ReviewTable } from "@/types";
import useCourses from "./useCourses";

const REVIEW_COLUMNS = "id, rating, difficulty, labs, relevance, lectures, material, workload, comment, created_at, user_id, course_id";
const CACHE_CONFIG = {
    staleTime: 1000 * 60 * 30, // Data anses färsk i 30 min
    gcTime: 1000 * 60 * 10, // Rensas om oanvänd i 10 min
};

async function fetchNonVerifiedReviews(): Promise<ReviewTable[]> {
    const coursesQuery = useCourses();
    const courses = coursesQuery.data || [];

    console.log("Courses fetched:", courses.length);
    
    // Fetch unverified reviews
    const { data: reviews, error: reviewError } = await supabase
        .from("reviews")
        .select(REVIEW_COLUMNS)
        .order("created_at", { ascending: false });
        enabled: courses.length > 0;

    if (reviewError) throw reviewError;
    if (!reviews) throw new Error("No reviews found");

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
    // print user jwt token for debugging
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    console.log(JSON.parse(atob(session.access_token.split('.')[1])));


    const { error } = await supabase
        .from("verified_reviews")
        .insert([{ review_id }]);

    if (error) {
        console.error("Error adding verified review:", error);
        throw new Error(`Failed to verify review: ${error.message}`);
    }
}

export default function useNonVerifiedReviews(): UseQueryResult<ReviewTable[], Error> {
    return useQuery({
        queryKey: ["reviews", "unverified"],
        ...CACHE_CONFIG,
        queryFn: fetchNonVerifiedReviews,
    });
}

export { addVerifiedReview };