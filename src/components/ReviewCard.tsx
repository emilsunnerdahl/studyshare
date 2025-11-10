import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import RatingStars from "./RatingStars";
import { Review } from "@/types";

type Props = {
  review: Review;
  ownReview: boolean;
};

export default function ReviewCard({ review, ownReview }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useTranslation("courseDetail");

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("sv-SE", {
      dateStyle: "short",
    });
  }

  return (
    <div
      onClick={() => setShowDetails((prev) => !prev)}
      className="bg-white cursor-pointer rounded-3xl p-5 border border-gray-100 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] max-w-xl w-full hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.15)] transition-all"
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          {ownReview && (
            <span className="rounded-full bg-green-400 text-xs px-2 py-1">
              {t("ownReview")}
            </span>
          )}
          {review.verified_review ? (
            <span className="rounded-full bg-blue-400 text-xs px-2 py-1">
              {t("verifiedReview")}
            </span>
          ) : (
            <span className="rounded-full bg-red-400 text-xs px-2 py-1">
              {t("notVerifiedReview")}
            </span>
          )}
        </div>
        <span>{formatDate("2025-11-04T21:42:48.698828+00:00")}</span>
      </div>
      <div className="flex gap-3 flex-col space-x-3 mb-5">
        <h2
          className={`text-lg font-semibold text-gray-900 ${
            !showDetails && "text-nowrap overflow-hidden overflow-ellipsis"
          } tracking-tight`}
        >
          {review.comment}
        </h2>
        <div className="flex gap-3 items-center">
          <RatingStars value={review.rating} size="lg" />
          <span className="text-base font-semibold text-gray-700">
            {review.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-6 mb-4 animate-fadeIn">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium">
              {t("difficulty")}
            </span>
            <RatingStars value={review.difficulty} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium">
              {t("labs")}
            </span>
            <RatingStars value={review.labs} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium">
              {t("lectures")}
            </span>
            <RatingStars value={review.lectures} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium mb-1">
              {t("material")}
            </span>
            <RatingStars value={review.material} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium mb-1">
              {t("relevance")}
            </span>
            <RatingStars value={review.relevance} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium">
              {t("workload")}
            </span>
            <RatingStars value={review.workload} size="sm" />
          </div>
        </div>
      )}

      <button className="flex cursor-pointer items-center text-sm text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors">
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
