import { Star } from "lucide-react";

const RatingStars = ({
  value,
  size = "md",
}: {
  value: number;
  size?: string;
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

export default RatingStars;
