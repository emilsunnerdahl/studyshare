import { Star, HelpCircle } from "lucide-react";

const RatingStars = ({
  value,
  size = "md",
}: {
  value: number;
  size?: string;
}) => {
  const sizeClass =
    size === "lg" ? "h-7 w-7" : size === "sm" ? "h-4 w-4" : "h-5 w-5";

  const getColorClasses = (val: number) => {
    if (val <= 1) return "text-red-500 fill-red-400";
    if (val <= 2) return "text-orange-500 fill-orange-400";
    if (val <= 3) return "text-yellow-500 fill-yellow-400";
    if (val <= 4) return "text-lime-500 fill-lime-400";
    return "text-green-500 fill-green-400";
  };

  const colorClass = getColorClasses(value);

  if (value === 0) {
    return (
      <div className="flex">
      <HelpCircle aria-label="unknown rating" className={`${sizeClass} text-gray-300`} />
      </div>
    );
  }

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const fillLevel = Math.min(Math.max(value - (i - 1), 0), 1);
        return (
          <div key={i} className="relative">
            <Star className={`${sizeClass} text-gray-200`} />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillLevel * 100}%` }}
            >
              <Star className={`${sizeClass} ${colorClass}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
