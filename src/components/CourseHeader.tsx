import { useTranslation } from "react-i18next";
import { AvgReviews } from "@/types";
import RatingStars from "./RatingStars";

type Props = {
  avgRating: AvgReviews | null;
};

export default function CourseHeader({ avgRating }: Props) {
  const { t } = useTranslation("courseDetail");

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-10 border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.08)] w-full max-w-5xl mx-auto hover:shadow-[0_8px_35px_-5px_rgba(0,0,0,0.12)] transition-all">
      <div className="flex flex-col mb-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {t("overallRating")}
          </h2>
        </div>

        <div className="flex items-center sm:ml-10 mt-3 sm:mt-0 space-x-3">
          <RatingStars value={avgRating?.rating || 0} size="lg" />
          <span className="text-xl sm:text-3xl font-bold text-gray-800">
            {avgRating?.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("difficulty")}
          </span>
          <div className="flex items-center gap-2">
            <RatingStars value={avgRating?.difficulty || 0} />
            {avgRating?.difficulty.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("labs")}
          </span>
          <div className="flex items-center gap-2">
            <RatingStars value={avgRating?.labs || 0} />
            {avgRating?.labs.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("lectures")}
          </span>
          <div className="flex items-center gap-2">
            <RatingStars value={avgRating?.lectures || 0} />
            {avgRating?.lectures.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("material")}
          </span>
          <div className="flex items-center gap-2">
            <RatingStars value={avgRating?.material || 0} />
            {avgRating?.material.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("relevance")}
          </span>
          <div className="flex items-center gap-2">
            <RatingStars value={avgRating?.relevance || 0} />
            {avgRating?.relevance.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("workload")}
          </span>
          <div className="flex items-center gap-2">
            <RatingStars value={avgRating?.workload || 0} />
            {avgRating?.workload.toFixed(1)}
          </div>
        </div>
      </div>
    </section>
  );
}
