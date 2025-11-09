import { useCourseReviews } from "@/hooks/useAdminReview";
import { supabase } from "@/lib/supabaseClient";
import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

type SortColumn = "course_name" | "course_code" | "comment" | "rating" | "created_at" | null;
type SortDirection = "asc" | "desc";

const deleteReview = async (reviewId: string) => {
    console.log("Deleting review with ID:", reviewId);
    const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

    if (error) {
        throw error;
    }
};

export default function Reviews() {

    const { data: reviews = [] } = useCourseReviews();
    const queryClient = useQueryClient();
    const [sortColumn, setSortColumn] = useState<SortColumn>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            // Toggle direction if clicking the same column
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            // Set new column and reset to ascending
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const filteredReviews = useMemo(() => {
        if (!searchQuery) return reviews;

        const query = searchQuery.toLowerCase();
        return reviews.filter((review) => {
            return (
                review.comment?.toLowerCase().includes(query) ||
                review.course_name?.toLowerCase().includes(query) ||
                review.course_code?.toLowerCase().includes(query) ||
                review.created_at?.toLowerCase().includes(query)
            );
        });
    }, [reviews, searchQuery]);

    const sortedReviews = useMemo(() => {
        if (!sortColumn) return filteredReviews;

        const sorted = [...filteredReviews].sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];

            if (valueA === null || valueA === undefined) return 1;
            if (valueB === null || valueB === undefined) return -1;

            // Handle string comparisons
            if (typeof valueA === "string" && typeof valueB === "string") {
                const comparison = valueA.localeCompare(valueB);
                return sortDirection === "asc" ? comparison : -comparison;
            }

            // Handle numeric comparisons
            if (typeof valueA === "number" && typeof valueB === "number") {
                return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
            }

            return 0;
        });

        return sorted;
    }, [filteredReviews, sortColumn, sortDirection]);

    const handleDeleteReview = (reviewId: string) => {
        deleteReview(reviewId)
            .then(() => {
                console.log("Review deleted:", reviewId);
                // Invalidate the cache so it refetches the reviews
                queryClient.invalidateQueries({ queryKey: ["reviews", "sv"] });
            })
            .catch((error) => {
                console.error("Error deleting review:", error);
            });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Reviews</h1>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                />
            </div>

            <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-900 uppercase text-xs tracking-wider">
                        <tr>
                            <th
                                className="px-6 py-3 text-left rounded-tl-2xl cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => handleSort("course_name")}
                            >
                                <div className="flex items-center gap-2">
                                    Course Name
                                    {sortColumn === "course_name" && (
                                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => handleSort("course_code")}
                            >
                                <div className="flex items-center gap-2">
                                    Course Code
                                    {sortColumn === "course_code" && (
                                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => handleSort("comment")}
                            >
                                <div className="flex items-center gap-2">
                                    Review Comment
                                    {sortColumn === "comment" && (
                                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => handleSort("rating")}
                            >
                                <div className="flex items-center gap-2">
                                    Rating
                                    {sortColumn === "rating" && (
                                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => handleSort("created_at")}
                            >
                                <div className="flex items-center gap-2">
                                    Created At
                                    {sortColumn === "created_at" && (
                                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-center rounded-tr-2xl"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReviews.map((review, index) => (
                            <tr
                                key={review.id}
                                className={`border-t border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100 transition`}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {review.course_name}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {review.course_code}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {review.comment}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {review.rating}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {review.created_at}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleDeleteReview(review.id)}
                                        className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        aria-label="Delete review"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
