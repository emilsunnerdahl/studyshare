import { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

type Review = {
  id: string;
  rating: number;
  difficulty: number;
  fun: number;
  lectures: number;
  material: number;
  workload: number;
  comment: string;
  created_at: string;
  user_id?: string;
};

const RatingStars = ({
  value,
  size = "md",
}: {
  value: number;
  size: string;
}) => {
  const sizeClass =
    size === "lg" ? "h-7 w-7" : size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i <= value ? "text-yellow-500 fill-yellow-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default function ReviewCard({ review }: { review: Review }) {
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useTranslation("courseDetail");

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] max-w-xl w-full hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.15)] transition-all">
      <div className="flex flex-col mb-4">
        <div className="flex items-center space-x-3 mb-1">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {review.comment}
          </h2>
          <RatingStars value={review.rating} size="lg" />
          <span className="text-base font-semibold text-gray-700">
            {review.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-4 animate-fadeIn">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium">
              {t("difficulty")}
            </span>
            <RatingStars value={review.difficulty} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium">
              {t("lectures")}
            </span>
            <RatingStars value={review.lectures} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium">
              {t("workload")}
            </span>
            <RatingStars value={review.workload} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium">
              {t("fun")}
            </span>
            <RatingStars value={review.fun} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium mb-1">
              {t("material")}
            </span>
            <RatingStars value={review.material} size="sm" />
          </div>
        </div>
      )}

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex cursor-pointer items-center text-sm text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors"
      >
        {showDetails ? (
          <>
            {t("hideDetails")} <ChevronUp className="ml-1 h-4 w-4" />
          </>
        ) : (
          <>
            {t("showDetails")} <ChevronDown className="ml-1 h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
