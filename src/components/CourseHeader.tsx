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
            {avgRating?.rating}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("difficulty")}
          </span>
          <RatingStars value={avgRating?.difficulty || 0} />
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("labs")}
          </span>
          <RatingStars value={avgRating?.labs || 0} />
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("lectures")}
          </span>
          <RatingStars value={avgRating?.lectures || 0} />
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("material")}
          </span>
          <RatingStars value={avgRating?.material || 0} />
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("relevance")}
          </span>
          <RatingStars value={avgRating?.relevance || 0} />
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-700 font-medium mb-1">
            {t("workload")}
          </span>
          <RatingStars value={avgRating?.workload || 0} />
        </div>
      </div>
    </section>
  );
}
