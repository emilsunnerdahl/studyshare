import { Link } from "react-router-dom";
import { Star } from "lucide-react";

type CourseCardProps = {
  code: string;
  name: string;
  credits: number;
  rating: number;
  programCode: string | undefined;
};

const CourseCard = ({
  code,
  name,
  credits,
  rating,
  programCode,
}: CourseCardProps) => {
  return (
    <Link
      className="bg-white shadow-md border border-gray-200 rounded-xl p-4 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-1rem)] lg:w-[calc(25%-1rem)] transition hover:shadow-[6px_6px_12px_0_#f280a1] group"
      to={"/programs/" + programCode + "/" + code}
    >
      <div className="text-sm text-gray-500 font-mono">{code}</div>
      <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 group-hover:text-datarosa transition-colors">
        {name}
      </h3>
      <p className="text-sm text-gray-700 mb-2">{credits} hp</p>
      <div className="text-sm font-medium text-datarosa flex items-center gap-1">
        {rating.toFixed(1)} / 5.0
        <Star size={16} fill="#facc15" className="text-[#facc15]" />
      </div>
      <p className="text-xs text-gray-400">42 reviews</p>
    </Link>
  );
};

export default CourseCard;
