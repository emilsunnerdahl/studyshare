import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import RatingStars from "./RatingStars";
import { useTranslation } from "react-i18next";

type CourseCardProps = {
  code: string;
  name: string;
  credits: string;
  avg_rating: number;
  review_count: number;
  rating: number;
  programCode: string | undefined;
  colorCode: string;
};

const CourseCard = ({
  code,
  name,
  credits,
  avg_rating,
  review_count,
  programCode,
  colorCode,
}: CourseCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    sessionStorage.setItem("scrollY", window.scrollY.toString());
    navigate("/programs/" + programCode + "/" + code);
  };

  return (
    <div
      className="hover:bg-[var(--hoverColor)]/30 hover:-translate-y-1 bg-o shadow-md border-2 border-[var(--hoverColor)] rounded-xl p-4 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-1rem)] lg:w-[calc(25%-1rem)] transition-transform duration-200"
      onClick={handleNavigate}
      style={{ ["--hoverColor" as any]: colorCode } as React.CSSProperties}
    >
      <div className="text-sm text-gray-500 font-mono">{code}</div>
      <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 transition-colors">
        {name}
      </h3>
      <p className="text-sm text-gray-700 mb-2">{credits} hp</p>
      <div className="text-sm font-medium flex items-center gap-1">
        {review_count == 0 ? (
          t("reviewMissing")
        ) : (
          <div className="flex items-center gap-2">
            <RatingStars value={parseInt(avg_rating.toFixed(1))} />
            {avg_rating.toFixed(1)}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400">
        {review_count == 1
          ? `${review_count} review`
          : `${review_count} reviews`}
      </p>
    </div>
  );
};

export default CourseCard;
