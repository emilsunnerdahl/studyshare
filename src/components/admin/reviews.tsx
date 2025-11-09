import { useCourseReviews } from "@/hooks/useAdminReview";
import { Review } from "@/types";

export default function Reviews() {

    const { data: reviews = [] } = useCourseReviews();




    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Reviews</h1>

            <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-900 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-3 text-left rounded-tl-2xl">User_id</th>
                            <th className="px-6 py-3 text-left">Review Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr
                                key={review.id}
                                className={`border-t border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100 transition`}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {review.user_id}
                                </td>
                                <td className="px-6 py-4 text-gray-700">{review.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
