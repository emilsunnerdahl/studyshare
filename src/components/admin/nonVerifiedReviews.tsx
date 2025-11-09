import useNonVerifiedReviews, { addVerifiedReview } from "@/hooks/useVerifiedReviews";
import { Trash2, Check } from "lucide-react";
import { useMemo } from "react";
import { useDeleteReview } from "@/hooks/useDeleteReview";

export default function NonVerifiedReviews() {
    const { data: nonVerifiedReviews = [] } = useNonVerifiedReviews();
    const { handleDeleteReview } = useDeleteReview();

    const sortedReviews = useMemo(() => {
        return [...nonVerifiedReviews].sort((a, b) => {
            const dateA = new Date(a.created_at || 0).getTime();
            const dateB = new Date(b.created_at || 0).getTime();
            return dateB - dateA; // Sort by newest first
        });
    }, [nonVerifiedReviews]);

    if (nonVerifiedReviews.length === 0) return null;

    return (
        <div className="mb-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Non-Verified Reviews</h1>

            <div className="overflow-x-auto bg-yellow-50 border border-yellow-300 rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-yellow-300 text-gray-900 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-3 text-left rounded-tl-2xl">Course Name</th>
                            <th className="px-6 py-3 text-left">Course Code</th>
                            <th className="px-6 py-3 text-left">Review Comment</th>
                            <th className="px-6 py-3 text-left">Rating</th>
                            <th className="px-6 py-3 text-left">Created At</th>
                            <th className="px-6 py-3 text-center rounded-tr-2xl"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReviews.map((review, index) => (
                            <tr
                                key={review.id}
                                className={`border-t border-yellow-200 ${index % 2 === 0 ? "bg-yellow-50" : "bg-yellow-100"
                                    } hover:bg-yellow-200 transition`}
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
                                <td className="px-6 py-4 text-center space-x-2 flex justify-center">
                                    <button
                                        className="inline-flex items-center justify-center p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                        aria-label="Approve review"
                                        onClick={() => addVerifiedReview(review.id)}
                                    >
                                        <Check size={18} />
                                    </button>
                                    <button
                                        className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        aria-label="Reject review"
                                        onClick={() => handleDeleteReview(review.id)}
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
 